# Pi customizations

Personal [Pi](https://github.com/earendil-works/pi) extensions and skills.

## Extensions

| Extension | Purpose |
| --- | --- |
| [`compact-shell.ts`](extensions/compact-shell.ts) | Compact status for agent-run bash/PowerShell and codemode calls; expand with Ctrl+O for full output. |

Install the extension locally:

```bash
mkdir -p ~/.pi/agent/extensions
cp extensions/compact-shell.ts ~/.pi/agent/extensions/
```

Because the extension supplies a customized codemode tool, disable Pi's separate built-in codemode registration in `~/.pi/agent/settings.json` to avoid a duplicate-tool warning (do **not** disable the `codemode` tool itself):

```json
{
  "extensions": ["-builtin:codemode"]
}
```

Merge that entry with any existing `extensions` setting. Run `/reload` in Pi (or restart it). This changes only the display of agent-run shell tools and codemode scripts. Collapsed codemode rows show the script's first code line, status, and nested tool names (with an error count if any nested call failed). Expanded rows retain Pi's full script, nested calls, and output. Commands entered directly in Pi and other tools, including edit diffs, are unaffected.

### Profile banner

`extensions/profile-banner.ts` adds a persistent **PI PROFILE** banner above the editor. It uses Pi's active agent directory (`PI_CODING_AGENT_DIR`): `agent-work` is purple, `agent-personal` is blue. Other directory names appear in gray; the standard `agent` directory is labeled **DEFAULT** rather than guessing an account.

Add the absolute path to `extensions/profile-banner.ts` to the `extensions` array in each profile's `settings.json`, then run `/reload`. This shows the Pi profile, not the provider login or email. It does not change the header, footer, or shell rendering.

## Skills

Add future skills under `skills/<name>/SKILL.md`. There are no skills in this repository yet.
