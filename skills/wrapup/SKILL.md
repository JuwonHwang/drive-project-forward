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
| Background | The background in GOAL.md. Connect it to a problem the audience has, and explain that problem step by step over several slides with visuals, as in `Explain a problem step by step over several slides` in `slides/RULES.md` |
| Goal and success criteria | What the project aims to achieve, and what must be shown to reach it |
| Approach | One slide on how the problem is abstracted (input, output, and the assumption that makes it possible), then the full architecture diagram of the method in the order the data flows. Each key part opens with its input and output with example values, then a zoomed-in diagram of its computation |
| Results | Measured results only. Conditions and a source for every number. For each metric, its computation on one example and what the value means |
| Limitations | Measurement scope and conditions not yet checked |
| Next steps or requests | Match the purpose of the talk. If there is a request, state what is requested and why |

Adjust the depth to the audience. For a business team, spend more slides on the background and on what the results make possible than on approach details. For a conference, give more detail on the approach and the conditions of the results.

## Principles

- **Attach an example or evidence to every claim.** Follow `Every claim has an example or evidence` in `slides/RULES.md`. This applies to the markdown document as well as the slides.
- **Do not claim more than was measured.** Do not generalize beyond the measured conditions. Do not drop the limitations section.
- **Do not present undecided items as decided.** Leave ongoing discussions out, or mark them `under review`.
- **Draw new concepts and proposals.** Concepts the audience has not seen are drawn as in `Draw new concepts`, and proposals as in `Draw proposals and options` in `slides/RULES.md`.
- **Match terms to the audience.** Names used only inside the project (variable names, condition names) are explained in plain words the first time they appear. Field terms follow `Terms and wording` in `slides/RULES.md`: keep the established term and define it, instead of replacing it with a colloquial description.
- **Show how each value is obtained.** Follow `Show how each value is obtained` in `slides/RULES.md`. In particular, mark which values a model sets and which a rule or a person sets, and show how one component's output enters the next.
- **Order and connection.** Follow `Order of explanation` in `slides/RULES.md`: principle before functions, input and output before computation, sections in data-flow order, dividers when the material is long, and messages that connect from slide to slide.
- **Do not quote the conversation.** Write decisions and arguments, not the user's words.
- The slide rules are the same as for meeting material: titles are specific noun phrases, the message is one sentence on the first line of the body, architecture diagrams are paper quality, parts are zoomed in, and the slides are in English with a toggle for the user's language when it is not English.

## Save and confirm

1. Write the markdown document to `wrapup/YYYY-MM-DD-<audience>.md`. Example: `wrapup/2026-11-03-business-team.md`.
2. Show the full markdown document in the response and get confirmation.
3. Build the slides `wrapup/YYYY-MM-DD-<audience>.html`. Read `slides/RULES.md` in the plugin folder (`../../slides/RULES.md` relative to this skill folder) and build the slides with its rules and `slides/template-wrapup.html`. Do not add content that is not in the markdown document.
4. Run the checks in `slides/RULES.md`, including `slides/check.mjs`, and fix every error it reports. Open the slides in a browser and show them to the user. Commit only when the user requests it.
