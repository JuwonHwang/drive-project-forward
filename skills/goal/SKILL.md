---
name: goal
description: Creates GOAL.md in a research repository for the first time. It records why the research started, the goal, the criteria for judging that the goal is reached, and the schedule. Use it when starting to manage a project, for example "create the goal document", "create GOAL.md", "start managing this research", "목표 문서 만들어", "GOAL.md 만들어", "이 연구 관리 시작하자". Do not use it when GOAL.md already exists.
---

# Starting GOAL.md

GOAL.md is the document that states why this research is done and what it means to reach the goal. When the project is shared with other people, this document is shown first. It is placed at the repository root. This skill is used only once, at the start. After that, `meet` edits GOAL.md after a meeting, and only when the user changed the goal itself.

## Goal and implementation

- The goal comes first, and the implementation exists to serve the goal. What the project does is visible in the code, so it is not written in GOAL.md.
- The background and goal change only when the user decides to adjust them. Decisions that change the method, implementation, or experiment design do not change GOAL.md.
- Meeting material reports progress against the success criteria.

## Language

Write GOAL.md in the user's language by default. The user's language is the language the user writes in during the conversation. If the user requests a specific language, write it in that language. Section names in the template below are given in English; write them in the language of the document. Markers such as `TBD` are also written in that language.

## Sections

```markdown
# <Title that states the goal in one sentence>

## Background
Why this project and its goal exist. What problem was experienced or observed, and what
existing methods or practice lacked. Write it so that a first-time reader understands why
this goal is needed.

## Goal
What this research aims to achieve. One or two sentences.

## Success criteria
The conditions under which the goal is judged to be reached. Write each item so it can be
checked: what is shown, under which conditions, and to which level.
Example: "Reduce training time by 30% while keeping the test accuracy of ResNet-18 on
CIFAR-10 equal to the baseline training (within 0.5 points, mean over 3 seeds)."

## Schedule
Deadlines and intermediate dates set by the user. If none were set, `TBD`.
```

## Principles

- **The background, goal, and success criteria are the user's judgment.** Do not infer them from the code or experiment results. If they are not in the documents, ask the user.
- **Write success criteria so they can be checked.** Do not use phrases such as `improve performance` or `confirm practicality`, which do not allow judging whether the goal is reached. If the user has not set a level, write `TBD` in its place and leave it to be decided in a meeting.
- **Do not write implementation details, experiment results, or code descriptions.**
- **Write only the current goal.** Do not write "the previous goal was ...". Git and the meeting notes keep the history.

## Procedure

1. Read the parts of the README and design documents that state the motivation, goal, and success criteria, and any existing meeting notes. Do not read the source code.
2. Ask the user the following, even if the documents already state it.
   - Why did this research start?
   - What does this research aim to achieve?
   - What must be shown to judge that the goal is reached?
   - Is there a deadline?
3. Write a draft. Reflect the user's answers in the order and with the arguments the user gave.
4. Show the full draft in the response. Do not replace it with "a draft was created", a summary, or only a file path.
5. When the user says to save it, save it and create the `meetings/` directory. When the user gives corrections, apply them and show the full text again.
6. Do not delete or edit existing documents. Commit only when the user requests it.
