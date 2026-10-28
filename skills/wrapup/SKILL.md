---
name: wrapup
description: Creates presentation material that shares a research project with other people. It reads the background and goal in GOAL.md, the decisions in the meeting notes, and the results in the meeting material, writes a markdown document, and builds slides from it. Use it when material for people outside the project is needed, for example "make a presentation", "material to share with the team", "introduce this project", "발표 자료 만들어", "팀에 공유할 자료", "이 프로젝트 소개 자료". Meeting material is created by `meet`.
---

# Presentation material

Presentation material shows people who do not know this project why the research is done, what was found, and what remains. Unlike meeting material (`meet`), it does not include internal action items, ongoing discussions, or options awaiting a decision.

## Ask first

Ask the user the following before writing. Do not write without the answers.

- Audience. Examples: research team, business team, external conference
- Talk length
- Purpose of the talk: sharing information, requesting feedback, or requesting resources or approval

## Read

1. `GOAL.md`: background, goal, success criteria
2. The `Decisions` section of the meeting notes `meetings/*-note.md` (or the section with the same role, if the note is written in another language): which decisions set the current method
3. The most recent meeting material `meetings/*-slides.md`: results, their conditions, and sources

## Section order

| Section | Content |
|---|---|
| Background | The background in GOAL.md. Connect it to a problem the audience has |
| Goal and success criteria | What the project aims to achieve, and what must be shown to reach it |
| Approach | The full architecture diagram of the method and zoomed-in diagrams of its key parts |
| Results | Measured results only. Conditions and a source for every number |
| Limitations | Measurement scope and conditions not yet checked |
| Next steps or requests | Match the purpose of the talk. If there is a request, state what is requested and why |

Adjust the depth to the audience. For a business team, spend more slides on the background and on what the results make possible than on approach details. For a conference, give more detail on the approach and the conditions of the results.

## Principles

- **Attach an example or evidence to every claim.** Follow `Every claim has an example or evidence` in `slides/RULES.md`. This applies to the markdown document as well as the slides.
- **Do not claim more than was measured.** Do not generalize beyond the measured conditions. Do not drop the limitations section.
- **Do not present undecided items as decided.** Leave ongoing discussions out, or mark them `under review`.
- **Match terms to the audience.** Names used only inside the project (variable names, condition names) are explained in plain words the first time they appear.
- The slide rules are the same as for meeting material: titles are specific noun phrases, the message is one sentence on the first line of the body, architecture diagrams are paper quality, parts are zoomed in, and the slides are in English with a toggle for the user's language when it is not English.

## Save and confirm

1. Write the markdown document to `wrapup/YYYY-MM-DD-<audience>.md`. Example: `wrapup/2026-11-03-business-team.md`.
2. Show the full markdown document in the response and get confirmation.
3. Build the slides `wrapup/YYYY-MM-DD-<audience>.html`. Read `slides/RULES.md` in the plugin folder (`../../slides/RULES.md` relative to this skill folder) and build the slides with its rules and `slides/template-wrapup.html`. Do not add content that is not in the markdown document.
4. Run the checks in `slides/RULES.md`, open the slides in a browser, and show them to the user. Commit only when the user requests it.
