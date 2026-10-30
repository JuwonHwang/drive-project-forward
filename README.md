# drive-project-forward

A Claude Code plugin that keeps a research project directed at its goal. It records the goal and the criteria for reaching it in one document (`GOAL.md`), builds explanatory slides for each meeting, and records what was decided in each meeting as a meeting note.

When research discussion continues within a single session, it tends to drift into details, reach conclusions too early, and turn documents into lists of earlier decisions appended one after another. This plugin keeps the goal at the top and fixes the order of work per meeting: understand, decide, record.

## Skills

| Skill | What it does | Files it creates |
|---|---|---|
| `goal` | Asks the user questions and sets the background (motivation), goal, success criteria, and schedule. Used once at the start. | `GOAL.md` |
| `meet` | Before a meeting: builds material that explains how the method works and why the results came out as they did. After a meeting: records decisions, action items, and deferred questions, and edits `GOAL.md` only when the user changed the goal itself. | `meetings/YYYY-MM-DD-slides.md`·`.html`, `meetings/YYYY-MM-DD-note.md` |
| `wrapup` | Builds presentation material for people outside the project. Asks for the audience, talk length, and purpose first. | `wrapup/YYYY-MM-DD-<audience>.md`·`.html` |
| `slides` | Builds slides from what was discussed in the current conversation. Confirms the questions and scope first. | `slides/YYYY-MM-DD-<topic>.md`·`.html` |

Slides are built with the rules in `slides/RULES.md` and the templates `slides/template.html` (meeting material, slides from a discussion) and `slides/template-wrapup.html` (presentation material). The rules are: one message per slide, titles written as specific noun phrases, paper-quality architecture diagrams with zoomed-in views of parts, a visual for every new concept and proposal, problems explained step by step over several slides, fixed color meanings (sky blue for concepts shown for the first time, red for important items, other colors for linking text to figures), English text with a toggle for the user's language when it is not English, repeated diagrams of the same subject kept the same in layout, names, colors, example values, and chart axes, an order of explanation (principle, then input and output with example values, then the computation, with sections in data-flow order), metrics shown with their computation on one example, and established terms defined before use. `slides/check.mjs` moves through every slide in every language in headless Chrome and reports content outside the slide, messages longer than two lines, and unintended line breaks.

## Workflow

1. `/drive-project-forward:goal`: create `GOAL.md`.
2. Before a meeting, `/drive-project-forward:meet`: create the explanatory material and slides.
3. In the meeting, the user reads the material, understands it, and makes decisions.
4. After the meeting, say "summarize the meeting": `meet` writes the meeting note. The material for the next meeting checks the action items in this note as reminders.
5. To share the project, `/drive-project-forward:wrapup`.

To make slides from a discussion at any point, use `/drive-project-forward:slides`.

`GOAL.md` and meeting notes are written in the user's language unless the user requests a specific language.

The skills do not draw conclusions or make decisions. The user makes decisions, and every file is shown in full and confirmed by the user before it is saved. Commits are made only when the user requests them.

## Installation

Run the following in Claude Code:

```
/plugin marketplace add JuwonHwang/drive-project-forward
/plugin install drive-project-forward@drive-project-forward
```

Slide verification (`slides/check.mjs` and screenshots) uses Node 22 or later and headless Chrome. If they are not installed, the skills report that the layout was not checked.

## License

MIT
