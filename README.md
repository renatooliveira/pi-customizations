# Pi customizations

Personal [Pi](https://github.com/earendil-works/pi) extensions and skills.

## Extensions

| Extension | Purpose |
| --- | --- |
| [`compact-shell.ts`](extensions/compact-shell.ts) | Compact status for agent-run bash/PowerShell calls; expand with Ctrl+O for full output. |

Install the extension locally:

```bash
mkdir -p ~/.pi/agent/extensions
cp extensions/compact-shell.ts ~/.pi/agent/extensions/
```

Run `/reload` in Pi (or restart it). This changes only the display of agent-run shell tools. Commands entered directly in Pi and other tools, including edit diffs, are unaffected.

## Skills

Add future skills under `skills/<name>/SKILL.md`. There are no skills in this repository yet.
