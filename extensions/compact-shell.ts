import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createBashToolDefinition, createPowerShellToolDefinition } from "@earendil-works/pi-coding-agent";
import { Text, truncateToWidth } from "@earendil-works/pi-tui";

const COMMAND_WIDTH = 88;
const EXCERPT_WIDTH = 120;

function errorExcerpt(output: string): string | undefined {
	return output
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(
			(line) =>
				line &&
				line !== "(no output)" &&
				!/^Command exited with code \d+$/.test(line) &&
				!/^\[Showing .* Full output: .*\]$/.test(line),
		)
		.at(-1);
}

export default function (pi: ExtensionAPI) {
	// Only replace the shell tool native to this platform; registering another
	// direct tool would also expose it to the model.
	const original = process.platform === "win32"
		? createPowerShellToolDefinition(process.cwd())
		: createBashToolDefinition(process.cwd());
	pi.registerTool({
		...original,
		renderCall(args, theme, context) {
			// Let the built-in renderer initialize its timing state.
			const component = original.renderCall!(args, theme, context) as Text;
			const prompt = process.platform === "win32" ? "PS>" : "$";
			const command = args.command?.replace(/\s+/g, " ").trim() || "…";
			const title = `${prompt} ${truncateToWidth(command, COMMAND_WIDTH, "…")}`;
			component.setText(theme.fg("toolTitle", theme.bold(title)));
			return component;
		},
		renderResult(result, options, theme, context) {
			// Retain Pi's full output, truncation notice, and timing when expanded.
			if (options.expanded) {
				// The collapsed renderer returned a Text, but Pi's expanded renderer
				// expects its previous component (if any) to be a Container.
				return original.renderResult!(result, options, theme, {
					...context,
					lastComponent: context.lastComponent instanceof Text ? undefined : context.lastComponent,
				});
			}

			// Pi's expanded renderer starts a refresh timer for running commands.
			// Stop it if the view is collapsed before the command completes.
			if (context.state.interval) {
				clearInterval(context.state.interval);
				context.state.interval = undefined;
			}
			const component = new Text("", 0, 0);
			if (options.isPartial) {
				component.setText(theme.fg("muted", "running…"));
				return component;
			}

			const output = result.content
				.filter((item) => item.type === "text")
				.map((item) => item.text)
				.join("\n");
			if (!context.isError) {
				component.setText(theme.fg("success", "✓ succeeded"));
				return component;
			}

			const exitCode = output.match(/(?:^|\n)Command exited with code (\d+)(?:\n|$)/)?.[1];
			const label = `✗ failed${exitCode ? ` (exit ${exitCode})` : ""}`;
			const excerpt = errorExcerpt(output);
			component.setText(
				theme.fg("error", label) +
				(excerpt ? `\n${theme.fg("error", truncateToWidth(excerpt, EXCERPT_WIDTH, "…"))}` : ""),
			);
			return component;
		},
	});
}
