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

## Skills

Add future skills under `skills/<name>/SKILL.md`. There are no skills in this repository yet.
