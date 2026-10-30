// Inspired by Armin Ronacher's extension: https://github.com/mitsuhiko/agent-stuff/blob/main/extensions/notify.ts
import { basename } from "node:path";
import { getAgentDir, type ExtensionAPI, type ExtensionContext } from "@earendil-works/pi-coding-agent";

// Pass notification text as arguments, never interpolate it into AppleScript.
const SCRIPT = `on run argv
	display notification (item 2 of argv) with title (item 1 of argv)
end run`;

export default function desktopNotifications(pi: ExtensionAPI) {
	async function notify(ctx: ExtensionContext) {
		if (ctx.mode !== "tui") return;
		if (process.platform !== "darwin") {
			ctx.ui.notify("Desktop notifications currently require macOS.", "warning");
			return;
		}

		const directory = basename(getAgentDir());
		const profile = directory === "agent" ? "DEFAULT" : directory.replace(/^agent-/, "").toUpperCase();
		const title = `Pi · ${profile} · ${basename(ctx.cwd) || ctx.cwd}`;
		try {
			const result = await pi.exec("/usr/bin/osascript", [
				"-e", SCRIPT, "--", title, "Ready for your next message.",
			], { timeout: 5000 });
			if (result.code !== 0) {
				ctx.ui.notify("Could not send desktop notification. Check macOS notification permissions.", "warning");
			}
		} catch {
			ctx.ui.notify("Could not run macOS desktop notifications.", "warning");
		}
	}

	// Unlike agent_end, this waits for automatic continuations to settle.
	pi.on("agent_settled", (_event, ctx) => notify(ctx));
	pi.registerCommand("notify-test", {
		description: "Send a test macOS desktop notification",
		handler: (_args, ctx) => notify(ctx),
	});
}
