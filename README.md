# Pi customizations

Personal [Pi](https://github.com/earendil-works/pi) extensions and skills.

## Extensions

| Extension | Purpose |
| --- | --- |
| [`compact-shell.ts`](extensions/compact-shell.ts) | Compact status for agent-run bash/PowerShell and codemode calls; expand with Ctrl+O for full output. |
| [`profile-banner.ts`](extensions/profile-banner.ts) | Persistent profile banner above the editor: purple for work, blue for personal. |
| [`notify.ts`](extensions/notify.ts) | Native macOS notifications when Pi settles, including in Rio. |

### Compact shell

Load the extension directly from this checkout—no copying required. Add its absolute path to `extensions` in your active profile's `settings.json` (`~/.pi/agent/settings.json` by default). Replace `/Users/YOUR_USER` below with your home directory.

Because the extension supplies a customized codemode tool, also disable Pi's separate built-in codemode registration to avoid a duplicate-tool warning (do **not** disable the `codemode` tool itself):

```json
{
  "extensions": [
    "-builtin:codemode",
    "/Users/YOUR_USER/projects/personal/pi-customizations/extensions/compact-shell.ts"
  ]
}
```

Merge these entries with any existing `extensions` setting. If you previously copied the extension into the profile's `extensions/` directory, remove that copy to avoid loading it twice. Run `/reload` in Pi (or restart it); future checkout updates also take effect after `/reload`. This changes only the display of agent-run shell tools and codemode scripts. Collapsed codemode rows show the script's first code line, status, and nested tool names (with an error count if any nested call failed). Expanded rows retain Pi's full script, nested calls, and output. Commands entered directly in Pi and other tools, including edit diffs, are unaffected.

### Profile banner

`extensions/profile-banner.ts` adds a persistent **PI PROFILE** banner above the editor. It uses Pi's active agent directory (`PI_CODING_AGENT_DIR`): `agent-work` is purple, `agent-personal` is blue. Other directory names appear in gray; the standard `agent` directory is labeled **DEFAULT** rather than guessing an account.

This shows the Pi profile, **not** the provider login or email. It does not change the header, footer, or shell rendering and is inactive in non-interactive modes.

#### Install for each profile

Add the extension's absolute path to the `extensions` array in both `~/.pi/agent-personal/settings.json` and `~/.pi/agent-work/settings.json`. For a checkout at `~/projects/personal/pi-customizations`, replace `/Users/YOUR_USER` below with your home directory:

```json
{
  "extensions": [
    "/Users/YOUR_USER/projects/personal/pi-customizations/extensions/profile-banner.ts"
  ]
}
```

Merge this entry with existing settings; do not replace other extensions. The banner works independently of compact shell and does not require disabling any built-in extension. Loading directly from the checkout means updates take effect after `/reload` without copying files.

#### Start a profile

```bash
# Blue PERSONAL banner
PI_CODING_AGENT_DIR="$HOME/.pi/agent-personal" pi

# Purple WORK banner
PI_CODING_AGENT_DIR="$HOME/.pi/agent-work" pi
```

Each profile has its own settings and authentication. Configure `/login` separately as needed. The banner reads the active agent directory, not the working directory or selected model. To switch profiles, exit Pi and launch it with the other directory.

Run `/reload` after adding the extension to the active profile's settings. If the banner is missing, check that you edited that profile's `settings.json`. A gray **DEFAULT** banner means Pi is using the standard `agent` directory; other unrecognized directory names are shown in uppercase and gray.

### Desktop notifications (Rio / macOS)

`extensions/notify.ts` uses macOS `osascript` directly, so it does not depend on Rio supporting terminal notification escape sequences. Add its absolute path to the active profile's `settings.json` `extensions` array, just like the other extensions; no copying or additional package is needed. Run `/reload`, then `/notify-test` to check delivery.

After Pi finishes its run and automatic continuations settle, it sends **Pi · PROFILE · project-folder** with **Ready for your next message.** This means Pi has stopped, not that the task necessarily succeeded. It also covers responses that end with a question, but does **not** detect mid-task confirmation dialogs or input prompts.

Notifications contain no response text, request no sound, and are sent even while you are watching Pi. macOS notification permissions and Focus settings determine whether they appear; check System Settings → Notifications if the test is not visible. Click behavior is controlled by macOS: the notification's **Show** action may open a folder instead of returning to Rio. This extension intentionally keeps the built-in `osascript` approach, with no click-to-focus helper or `terminal-notifier` dependency. Non-interactive runs do not send notifications; other operating systems are not supported.

## Skills

Add future skills under `skills/<name>/SKILL.md`. There are no skills in this repository yet.
