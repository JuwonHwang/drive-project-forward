---
name: meet
description: Handles the before and after of one research meeting. Before the meeting, it creates explanatory material (markdown and slides) so the user understands how the method works and why the results came out as they did. After the meeting, it writes the meeting note and edits GOAL.md if the user adjusted the goal itself. Use it for "prepare the meeting material", "prepare for the meeting", "summarize the meeting", "write the meeting notes", "the meeting is over", "미팅 자료 만들어", "미팅 준비해", "설명 자료 만들어", "미팅 정리해", "회의록 써", "미팅 끝났다".
---

# Meeting (meet)

This skill handles the before and after of one meeting. Before the meeting it creates explanatory material (Part 1), and after the meeting it writes the meeting note (Part 2).

# Part 1. Before the meeting: explanatory material

The purpose of this meeting is for the user to understand. Rather than reporting what was done, the material explains step by step how the method works and why the results came out as they did.

Create two pieces of material.

1. **Markdown material** `meetings/YYYY-MM-DD-slides.md`: the source of the meeting content. Write it in the section order below.
2. **Slides** `meetings/YYYY-MM-DD-slides.html`: the markdown material drawn in the form shown in the meeting. Do not add or remove content. Read `slides/RULES.md` in the plugin folder (`../../slides/RULES.md` relative to this skill folder) and build the slides with its rules and `slides/template.html`.

## This material does not decide

- It does not draw conclusions. Causes and interpretations are presented as candidates, each with its evidence.
- It does not make decisions. Items to be decided are shown as options with pros and cons. If an option is recommended, mark it `recommended` with the reason, but do not write it as if it were decided.
- While creating the explanatory material, do not edit GOAL.md or the meeting notes. That is done in Part 2 after the meeting.

## Read

1. `GOAL.md`: background, goal, success criteria, schedule
2. The most recent meeting note `meetings/YYYY-MM-DD-note.md`: decisions, action items, deferred questions. If there is none, this is the first meeting
3. Previous meeting material `meetings/*-slides.md`: to check which concepts were already explained
4. The `git log` subjects and bodies since that meeting date, and run records and result files. Examples are taken from these records

## Section order

| Section | Content |
|---|---|
| Questions for this meeting | 1 to 3 questions this material explains. Example: "Why do 65% of runs diverge at learning rate 0.1?" |
| Reminder of the last meeting | One slide. For each previous action item, its status (done, in progress, not done with the reason). For each success criterion, its position (met, not met with the current level, not yet measured). For the first meeting, the goal and success criteria in GOAL.md |
| How it works | Show the full architecture diagram and zoom in on the parts related to the questions. Then pick one example from an actual run record and follow it from start to end. For each step, show the input, processing, and output |
| Results and causes | For each result, show the candidate causes and the records that show each cause (which example, which part of which log). Attach conditions and sources to numbers, and distinguish measured values from estimates |
| Not yet explained | Phenomena whose cause was not found, and what to look at to find it |
| Understanding check | A few sentences stating what the user should know at the end of this meeting. This slide lets the user check that it matches their understanding |
| Decisions needed, next plan | Only when there are any. One slide per decision, with options and pros and cons. The next plan is given per option |

Write the section name in the eyebrow. Example: `How it works 2/4`.

## How to explain

- **Whether to explain a concept depends on whether it was already explained in this project.** Do not skip a concept because it is at graduate level or a "common term". The previous meeting material (`meetings/*-slides.md`) is the list of concepts already explained.
  - Concepts explained in previous material are recalled in one line.
  - Concepts never explained are explained even if they are common terms: a one-line definition, the role it plays in this method, and one example from actual records. Example: "Label smoothing: a target distribution that moves part of the target probability from the correct class to the other classes. In this experiment it is used to reduce the model's overconfidence in the correct answer."
  - Do not write only a textbook definition. What it does inside this method is the point.
- **Spend slides on new concepts and new results.** Do not explain again at length what was already explained.
- **Define symbols, and state their meaning again when they are reused later.** Example: `k (number of candidates)`. If something can be written without a symbol, do not use a symbol.
- **Do not refer to steps by number only.** Write `data augmentation (③)` instead of `③`.
- **Take examples from actual records.** Attach the source (run path, example id). When a made-up example is used, mark it `illustrative`.
- **Attach an example or evidence to every claim.** Follow `Every claim has an example or evidence` in `slides/RULES.md`. This applies to the markdown material as well as the slides.
- **Do not assert a single cause.** Distinguish what the records show from estimates.

## Do not omit

- No action item from the previous meeting note is missing from the reminder.
- Every number has conditions and a source. A number whose source could not be found is not written, or is marked `source unconfirmed`.
- If numbers differ between documents, do not hide it; show both in `Not yet explained`.
- After writing `Results and causes`, check it against the questions by perspective in `references/questions.md`. If a question about these results was missed, put it in `Not yet explained`.

## Saving and confirming before the meeting

1. Write the markdown material to `meetings/YYYY-MM-DD-slides.md`. The date is the meeting date.
2. Build the slides `meetings/YYYY-MM-DD-slides.html` from the markdown material. One section of the markdown becomes several slides.
3. Run the checks in `slides/RULES.md`. If the slides have a second language, capture screenshots in both languages and check for clipping.
4. Open the slides in a browser and show them to the user. Commit only when the user requests it.

# Part 2. After the meeting: meeting note

After the meeting, do two things. Write the meeting note, and edit GOAL.md if the user adjusted the goal itself.

## Meeting note

Write the meeting note in the user's language by default. The user's language is the language the user writes in during the conversation. If the user requests a specific language, write it in that language. Section names in the template below are given in English; write them in the language of the note. If a previous meeting note exists, use the same section names as that note.

Write it to `meetings/YYYY-MM-DD-note.md`. The date is the meeting date, the same date as the meeting material (`YYYY-MM-DD-slides.md`). It has only three sections.

```markdown
# Meeting YYYY-MM-DD

## Decisions
- What the user decided. One sentence per item. If the user gave a reason, write it too.

## Action items
- Action items. If there are branches (sub-questions), put the branch name first. The reminder in the next meeting material checks this list item by item.

## Deferred questions
- Questions that were postponed without a decision this time.
```

- Write as decisions only what the user said. Anything Claude proposed during the meeting that the user did not decide goes in `Deferred questions`.
- Write action items specifically enough that the next meeting can judge whether they are done. Example: `add seed 1 and 2 runs on CIFAR-100` instead of `run more experiments`.
- Do not write a summary or the course of the discussion.

## GOAL.md

Edit GOAL.md only when the user decided to adjust the background, goal, success criteria, or schedule themselves. Decisions to change the method, implementation, or experiment design do not change GOAL.md. Such decisions are recorded only in the `Decisions` section of the meeting note.

When editing:
- Write in the language GOAL.md is already written in, unless the user requests another language.
- Replace the changed sentence. Do not append a new paragraph at the end of a section.
- Do not write "the previous goal was ..." or "changed in the YYYY-MM-DD meeting". The meeting notes and git keep the history.

## Procedure after the meeting

1. From the meeting conversation, extract what the user decided, the action items, and the deferred questions. Show the full meeting note in the response and get confirmation. Do not replace it with a summary or only a file path.
2. When the user confirms, save the meeting note.
3. If GOAL.md needs editing, show the proposed change for each section as the sentence before and the sentence after. When the user confirms, save it.
4. Commit only when the user requests it.
