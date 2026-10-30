import { basename } from "node:path";
import { getAgentDir, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { rgbColor, truncateToWidth } from "@earendil-works/pi-tui";

const WORK = rgbColor(126, 34, 206);
const PERSONAL = rgbColor(29, 78, 216);
const UNKNOWN = rgbColor(75, 85, 99);
const WHITE = rgbColor(255, 255, 255);

export default function profileBanner(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		if (ctx.mode !== "tui") return;

		const directory = basename(getAgentDir());
		const profile = directory === "agent" ? "work" : directory.replace(/^agent-/, "");
		const color = profile === "work" ? WORK : profile === "personal" ? PERSONAL : UNKNOWN;
		const label = profile.toUpperCase();

		ctx.ui.setWidget("profile-banner", (_tui, theme) => ({
			render(width) {
				const text = truncateToWidth(` PI PROFILE: ${label} `, width, "");
				return [theme.style(text, { fg: WHITE, bg: color, bold: true })];
			},
			invalidate() {},
		}), { placement: "aboveEditor" });
	});
}
