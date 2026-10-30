---
name: slides
description: Builds slides from what was discussed in the current conversation. It writes a markdown document from the discussion and builds slides from it with the shared slide rules. Use it when slides are needed outside a meeting or a presentation, for example "make slides from this discussion", "turn this into slides", "make slides of what we discussed", "논의한 내용으로 슬라이드 만들어", "이거 슬라이드로 만들어". Meeting material is created by `meet`, and presentation material for people outside the project by `wrapup`.
---

# Slides from a discussion

This skill turns what the user and Claude discussed in the current conversation into slides. Unlike `meet` and `wrapup`, its input is the discussion, not the records in the repository.

## Ask first

Before writing, show the following in the response and get confirmation. If the discussion does not make them clear, ask the user.

- Questions for this material: 1 to 3 questions the slides answer, taken from the discussion
- Scope: which part of the conversation the slides cover
- Audience, if it is someone other than the user

## Read

1. The current conversation, within the confirmed scope
2. Files, run records, and results that were cited in the discussion, only to check numbers and attach sources

## Principles

- **Use only what was discussed.** Do not add content, conclusions, or examples that did not appear in the discussion. Evidence for a claim may be taken from the files, run records, and results cited in the discussion. If a claim has no evidence there, or something else is needed to make a slide understandable, ask the user before adding it.
- **Distinguish decided from undecided.** Write as decided only what the user decided. Write what Claude proposed and the user did not decide as a proposal or an open question.
- **Attach an example or evidence to every claim.** Follow `Every claim has an example or evidence` in `slides/RULES.md`. This applies to the markdown document as well as the slides.
- **Do not claim more than was shown.** Distinguish measured values from estimates. Attach conditions and a source to every number. A number whose source could not be found is not written, or is marked `source unconfirmed`.
- **Draw proposals and new concepts.** When the discussion proposed options or something that does not exist yet, draw them as in `Draw proposals and options` in `slides/RULES.md`. Concepts introduced in the discussion are drawn as in `Draw new concepts`.
- **Explain problems step by step.** When the discussion covered a problem, explain it over several slides with visuals, as in `Explain a problem step by step over several slides` in `slides/RULES.md`.
- **Keep the user's arguments in the user's order.** When the slides present the user's view, follow the arguments and order the user gave. Write the arguments and decisions, not the user's words as quotations, as in `Do not quote the conversation` in `slides/RULES.md`. When the discussion collected statements from several people, organize them into principles, as in `Order of explanation`.
- **Show how each value is obtained, and use established terms.** Follow `Show how each value is obtained` and `Terms and wording` in `slides/RULES.md`.

## Section order

| Section | Content |
|---|---|
| Questions for this material | The confirmed questions |
| Explanation | For each question, the content from the discussion that answers it, in the order of `Order of explanation` in `slides/RULES.md`: principle, then input and output with example values, then the computation. Use a full architecture diagram and zoomed-in diagrams when the discussion covered a structure. When the discussion is about what to improve, list the functions as in `Material for discussing improvements` |
| Open questions | Questions raised in the discussion that were not answered or decided. Only when there are any |
| Understanding check | One sentence per question on what should be known |

## Save and confirm

1. Write the markdown document to `slides/YYYY-MM-DD-<topic>.md`. The date is today's date. `<topic>` is a short name of the subject in lowercase words joined by hyphens. Example: `slides/2026-10-29-early-stopping-rule.md`.
2. Show the full markdown document in the response and get confirmation. Do not replace it with a summary or only a file path.
3. Build the slides `slides/YYYY-MM-DD-<topic>.html`. Read `slides/RULES.md` in the plugin folder (`../../slides/RULES.md` relative to this skill folder) and build the slides with its rules and `slides/template.html`. Do not add content that is not in the markdown document.
4. Run the checks in `slides/RULES.md`, including `slides/check.mjs`, and fix every error it reports. Open the slides in a browser and show them to the user. Commit only when the user requests it.
