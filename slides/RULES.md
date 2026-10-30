# Slide rules

Shared rules that `meet`, `wrapup`, and `slides` read when they build slides. The templates are in the same folder: `template.html` for meeting material (`meet`) and slides from a discussion (`slides`), and `template-wrapup.html` for presentation material (`wrapup`).

Start by copying the template for the skill. Both templates have the same CSS and script. The template implements aspect-ratio fitting, navigation with the keyboard and with the previous and next buttons at the bottom right, slide numbers, the cover design, and highlighting parts of a diagram. Clicking the slide itself does not change the slide. Do not change its CSS or script; fill in only the slide content and diagrams. The template content (examples describing this plugin) only shows the format, so replace all of it. This includes the `<title>` in `<head>` and the `aria-label` of every SVG. `template-wrapup.html` shows the section order of `wrapup`: questions, background, goal and success criteria, approach, limitations, understanding check.

## Slide structure

A slide consists of, from top to bottom, the eyebrow, title, message, and body.

- **Eyebrow (`.eyebrow`)**: the number of the question it answers, the section name, and the position within the section. Example: `Q1 · How it works 2/2`. Do not make a table-of-contents slide.
- **Title (`.title`)**: the subject of the slide as a noun phrase. Do not write it as a sentence.
- **Message (`.lead`)**: the key message of the slide as one complete sentence. One per slide. If there are two messages, split the slide. Example: a result and the limitation of that result go on different slides.
- **Body**: bullets, diagrams, and tables only. Bullets and numbered items start with a short label in bold with `<strong>`. Example: `<strong>Q1.</strong> …`, `<strong>Input:</strong> …`. Do not write paragraphs. The body contains only content that supports the message.

## Cover

The cover is the first slide and the only slide with a decoration: the dot grid on the right that the template's CSS draws. Fill in only its four parts, and add nothing else.

- **Kind (`.kicker`)**: the kind of material as a short noun phrase. `Meeting material`, `Presentation`, or `Slides`.
- **Title (`.title`)**: the subject of the material as a noun phrase, with the project name. At most three lines on the screen. If it reaches four lines, shorten it.
- **Subtitle (`.sub`)**: one line on the scope or the audience. Example: `Divergence at learning rate 0.1 and two options for the schedule`.
- **Meta (`.meta`)**: the date, then the duration or the audience, separated by ` · `.

Do not put a message (`.lead`), bullets, a diagram, a logo, or a color class on the cover.

## The material alone shows why each slide exists

- After the cover, put a `Questions for this meeting` slide (`Questions for this talk` for presentation material, `Questions for this material` for `slides`). There are 1 to 3 numbered questions.
- Every later slide answers one question. Write the question number and section name in the eyebrow. Example: `Q1 · How it works 2/2`.
- The message (`.lead`) states how the slide answers its question. Do not include slides that are not connected to a question.
- At the end, put an `Understanding check` slide with one sentence per question on what should be known.

## Break long sentences at units of meaning

When a message or bullet is longer than one line, do not let the browser break it at an arbitrary position. Insert `<br>` at a comma or where the meaning breaks.

- Put one unit of meaning per line. Example: `The meeting note becomes the reminder for the next meeting material,<br>and GOAL.md …`
- Do not break inside a unit of meaning, such as inside a noun phrase.
- Decide the breaks separately for each language. Break at commas, semicolons, and clause boundaries.
- A message has at most two lines. If it reaches three lines, shorten the sentence or split the slide.
- If a line still exceeds the screen width after the break, shorten the sentence. Check the screenshots for unintended line breaks.

## Project name

Write the project name in bold wherever it appears in slide text, including the cover, titles, messages, bullets, and captions. Wrap it in `<span class="proj">…</span>`. Inside SVG text, add `font-weight="800"`. The project name is the repository's top-level directory name, unless GOAL.md or the user gives another name.

## Be specific

A **title** states the subject, the aspect, and the scope. The scope is the dataset, model, and conditions. From the title alone, it must be clear what aspect of what is covered under which conditions. Do not use words with several possible readings on their own, such as `Results`, `Problem`, `Method`, `Overview`, `Background`, `Analysis`, `Comparison`, `Structure`, or `Step B`.

| Vague title | Specific title |
|---|---|
| Results | CIFAR-10 test accuracy (ResNet-18, seeds 0-2) |
| Problem | Share of runs that diverged at learning rate 0.1 (ResNet-18, CIFAR-10) |
| Structure | Full structure of the data augmentation pipeline (CIFAR-10 training setup) |
| Decision rule | Stopping rule of early stopping (patience 5 epochs, based on val loss) |

**Name steps and subjects by what they do.** Put skill, file, function, and variable names in parentheses as a supplement. Example: `3-seed repeated experiment (config_b)`, not `config_b experiment`. Do not let one name refer to different steps.

**Messages and bullets** state names, numbers, and conditions. Do not use words without a range or size, such as `some`, `most`, `improved`, or `effective`. Example: `13 of 20 runs (65%) diverged` instead of `most runs diverged`.

**Numbers** carry conditions (model, number of seeds, sample size) and a source. Write the source in `.source` as the path of the evidence file or a paper. Values that were not measured are marked as estimates.

## Every claim has an example or evidence

A claim is a message or bullet that states a fact, a cause, an evaluation, or a comparison. Attach an example or evidence to every claim, on the same slide.

- **Evidence:** a run record, a log excerpt, a result file, a measured number, a diagram of the actual structure, a quoted line from a document or code, or a paper. Write where it comes from in `.source` (file path, run path, example id, paper).
- **Example:** one concrete case that shows the claim. Take it from actual records when they exist. A made-up scenario that can generally occur may also be used; mark it `illustrative` and do not present it as a record or a measurement.
- A document that only states the claim, such as a README sentence, is the source of the claim, not its evidence. Write it as the source and attach evidence separately.
- If no example or evidence can be found, do not write the claim, or mark it `no evidence` and put it in `Not yet explained` (`Limitations` for presentation material).
- Do not attach evidence that shows something else. The evidence must show the claim under the conditions stated in the claim.

## Draw architecture diagrams at paper quality

A diagram that shows a structure is detailed enough to be used as a figure in a paper.

- Draw every component. Each box has a name and what it does. Number the boxes (①②…) to show the order.
- Label each arrow with the data it carries. Example: `augmented image batch`, `val loss per epoch`.
- Write decision conditions and branches. Example: `Has val loss not decreased for 5 epochs?`, `Yes: stop training`, `No: next epoch`.
- Write loops, stop conditions, and return values.
- Write numbers for cost or size. Example: `2 GPU hours`, `5,000 val images`.
- Place the boxes in the order the data moves. Arrange them so lines do not cross.

Give each diagram's `<svg>` an `aria-label` that states what the diagram shows, in English. Example: `aria-label="Full training loop: data loading, augmentation, training step, stop decision"`. Screen readers read this text in place of the figure. Do not put the plugin name or the author in it.

Define each diagram once in `<template id="diagram-name">`. Put `data-part="name"` on the `<g>` of each component. On an arrow or label that connects two parts, write both names separated by a space (`data-part="gate val"`). The same structure uses the same diagram on every slide.

## Zoom in on specific parts

A slide that explains one part of the full structure draws a new detailed diagram zoomed in on that part. Do not stop at making only that part dark in the full diagram.

- **Zoomed-in detail** (left, wide): the internal steps, inputs and outputs, and decision rules of that part, with example values. Example: val loss per epoch, whether it increased from the minimum, the stop decision. The detail is also defined with `<template id="diagram-name-detail">`.
- **Position marker** (right, small): load the full diagram with `data-focus="part name"`. Only that part stays dark and the rest is made translucent. Add a caption below, such as `Position of the stop decision (④) in the full training loop`.
- The layout is `.figure` (detail) and `.side` (`.locator` and short bullets) inside `.zoom`. The 5th slide of the template is an example.
- The slide that first shows the full structure draws the full diagram at screen width. Slides that explain parts follow the order of the structure.

## Draw new concepts

A concept shown for the first time in the material (`new`) is explained with a visual, not only with a definition in words. Put the visual on the slide that introduces the concept, at least as large as the text.

- **What to draw:** the concept applied to one concrete case from this project. Show its input, what it does, and its output with example values. Example: for early stopping, a val loss curve over epochs with the minimum, the 5-epoch patience window, and the stop point marked.
- **Where it sits:** if the concept is a part of the full structure, add the position marker (`.locator`) as in `Zoom in on specific parts`.
- **Before and after:** if the concept changes something, draw the state without it and with it side by side, with the same base drawing.
- Color the concept `new` in both the visual and the text.
- If the concept needs more than one visual (its mechanism and its effect), use one slide per visual.

## Explain a problem step by step over several slides

A problem is a situation where the method does not behave as expected: a failure, a divergence, a wrong output, a cost that is too high. Do not explain a problem on one slide. Split it into the steps below, one slide per step, each with a visual. The reader must be able to follow the problem without prior knowledge of it.

| Step | Slide content | Visual |
|---|---|---|
| 1. Expected behavior | What should happen, under which conditions | The structure or the data path when it works as intended |
| 2. Where it differs | The point in the structure where the observed behavior leaves the expected one | The same diagram with `data-focus` on that part, the differing part colored `crit` |
| 3. Observed symptom | What was observed, with numbers and conditions | The actual record: a curve, a log excerpt, a table of runs, one failing example |
| 4. Mechanism, one slide per candidate | How the problem arises, step by step. One candidate cause per slide; do not assert one cause | A zoomed-in diagram that follows one example through the step, with values at each point |
| 5. Consequence | What the problem prevents or costs, in numbers | A comparison of the expected and the actual result |

- Use the same diagram and the same colors through all the steps, so the reader sees one situation develop. Each step adds one thing to the previous slide.
- If a step needs more than one slide, split it further. Do not compress steps to save slides.
- The eyebrow numbers the problem slides together. Example: `Q1 · Divergence at lr 0.1 3/6`.
- If there is no record for a step, the slide says so and the visual is marked `illustrative`. Step 4 candidates without evidence go to `Not yet explained`.

## Draw proposals and options

Anything the material proposes that does not exist yet is drawn, not only described in words. Use visuals as much as the content allows: a proposal slide has a diagram for every option, and the text only states what the diagram shows. This covers each option of a decision, a new component, new data, a new metric, and a change of plan. A table of pros and cons alone does not show what each option changes, so the reader cannot judge it.

- **One panel per option, side by side.** Use `.options` with one `.option` per option. Each panel has the option label (`h3`), a diagram, and one line on what changes. The 7th and 8th slides of the template are an example.
- **Same base in every panel.** Each panel draws the same part of the structure at the same scale and position. Only what the option changes differs between panels, so the difference is visible by comparing panels.
- **Changed parts get the option's color.** Give option A `c1`, B `c2`, C `c3` (at most 4 options, as in `Color meanings`). The parts an option adds or changes, the option label, and that option's row in the pros-and-cons table use that color. Unchanged parts stay uncolored.
- **Parts that do not exist yet have a dashed border.** Put `prop` on the group, as in `<g data-part="…" class="c2 prop">`. Add a legend for the dashed border on the slide.
- **If one option keeps the current state, draw it too.** Its panel shows the current structure with nothing colored.
- **Show a value where it decides the choice.** Example: where the loss is computed, what the target is, the size of the data, the time cost. Mark values that were not measured as estimates.

What to draw depends on the kind of proposal.

| Proposal | What to draw |
|---|---|
| Structure or training method | The part of the architecture that changes: added or replaced modules, where the loss is computed and what its target is, which modules receive gradients and which are frozen |
| Data | One sample per data type: the input (for a time series, a small line plot of the series), the target, and the positions where the loss is computed. Mark made-up samples `illustrative` |
| Evaluation or success criterion | The shape of the result each criterion would produce: the axes, the comparison target, and the threshold line. Mark it `illustrative`, because there is no result yet |
| Order or schedule | A timeline per option with the steps, their order, and the estimated time of each step |

Put the pros and cons on the next slide as a table. The eyebrow numbers the two slides together. Example: `Decisions needed 2a/4`, `Decisions needed 2b/4`. If the panels and a short table of 2 to 3 rows fit on one slide without shrinking the text, they may share one slide.

## Language

Write all text in English. If the user's language is not English, also write every text in the user's language and add a language toggle. The user's language is the language the user writes in during the conversation.

- English only: remove `data-alt` from `<html>` and give text no `lang` attribute. The toggle button is hidden.
- With the user's language: set `data-alt` on `<html>` to its language code. Example: `<html lang="en" data-lang="en" data-alt="ko">`. The template is an example with `data-alt="ko"`.
- HTML text puts `<span lang="en">…</span><span lang="<code>">…</span>` side by side. This applies to titles, messages, bullets, table headers, captions, and sources.
- SVG text puts one `<text lang="en">` and one `<text lang="<code>">` at the same coordinates. Text that is the same in both languages (`ResNet-18`, `x₁`, numbers) is written once without `lang`.
- The two languages are translations of each other. Do not put content in only one of them.
- If the longer language overflows a box, split the line. Capture screenshots in both languages to check.
- Switching: the button at the bottom left or the `L` key. Slides change with the arrow buttons at the bottom right or the arrow keys. Slides open in the user's language by default. Adding `?lang=<code>` to the address opens that language. The last choice is saved in the browser and takes precedence over the default.

## Color meanings

Use color only when it has a meaning. Do not use color for decoration or emphasis. All other text is black.

| Color | Class | Meaning |
|---|---|---|
| Sky blue `#0284c7` | `new` | A concept or result shown for the first time in this material. Not explained in previous meeting material |
| Red `#dc2626` | `crit` | Important. A fact or condition that must be remembered from this material |
| Purple `#6d28d9`, green `#15803d`, ochre `#a16207`, slate `#475569` | `c1`-`c4` | No meaning. Links text to the visual it refers to |

- **The same subject has the same color.** When text refers to a diagram box, a chart series, or a table cell, the text and that visual get the same color. Within one piece of material, the same subject uses the same color on every slide.
- **new and crit follow this rule too.** If a concept shown for the first time is also a diagram box, that box is sky blue. If an important fact refers to a specific part of a figure, that part is red.
- All colored text is bold. This applies to both HTML text and SVG text, and the template's color classes set the weight. The message line has a lower default weight (500) so colored words (800) stand out.
- Use at most 4 link colors (`c1`-`c4`) per slide. If more are needed, split the slide.
- Color text with `<span class="new">`, `<span class="crit">`, `<span class="c1">`. For a diagram box, put the same class on the group, as in `<g data-part="…" class="c1">`. The box border and name then get that color, and the inside is filled with a light tint of it. Boxes without a color are filled white. For SVG text and cells, add the class as in `class="… crit"`.
- Limit colored text to a few words per slide. Coloring a whole sentence is allowed only for one crit sentence.

## Background of visuals

Diagrams, tables, and charts sit on a light gray background (`--panel`, `#f8f9fa`). The template's `.figure` and `.locator` already have this background. Diagram boxes without a color are filled white, and boxes with a color are filled with a light tint of it, to separate them from the background.

## Split slides that overflow

The screen has no scrolling. If there is too much content, split the slide instead of shrinking the text. Keep the template styles as they are. The slide background is white, and color is used only as described in `Color meanings`. Do not add decorations or shadows. The dot grid on the cover is the only decoration, and the template draws it.

## Components

| Content | Use |
|---|---|
| Subject of the slide | `h2.title` (noun phrase) |
| Key message | `p.lead` (one sentence) |
| List of evidence | `ul.points` (3 to 5 items, one line each) |
| Full structure | `<template id="diagram-name">` + `.figure[data-diagram]` |
| Part explanation | `.zoom` = detail `.figure[data-diagram="name-detail"]` + `.locator[data-focus]` inside `.side` |
| Options of a decision, a proposal | `.options` = one `.option` per option: `h3` (label), `.opt-fig[data-diagram]`, `.caption` |
| Part that does not exist yet | `class="prop"` on the diagram group (dashed border) |
| Number comparison | `table`. Number cells are `td.num`. To color a cell, use the classes in `Color meanings` |
| Table with two-line cells | `table.small` |
| Source | `.source` |
| Cover | `section.slide.cover` = `.kicker`, `.title`, `.sub`, `.meta` |
| Project name | `span.proj` |

## Checks

After building, check the following.

```bash
f=<file>
grep -c '<section class="slide' "$f"              # number of slides
grep -c 'class="title"' "$f"                        # must equal the number of slides
grep -c 'class="lead"' "$f"                         # must equal the number of slides minus the cover
grep -c 'class="kicker"\|class="meta"' "$f"         # 2: the cover has its kind and meta
grep -o '<h2 class="title">[^<]*' "$f"              # check that titles are noun phrases with subject, aspect, and scope
grep -o 'data-diagram="[^"]*"' "$f" | sort -u       # diagrams used
grep -o 'id="diagram-[^"]*"' "$f" | sort -u         # diagrams defined
grep -c 'lang="en"' "$f"; grep -c 'lang="<code>"' "$f"  # with data-alt: equal, excluding the <html> tag
grep -o '<title>[^<]*' "$f"                          # title of this material, not the template's
grep -o 'aria-label="[^"]*"' "$f"                    # each states what its diagram shows
```

If a browser is available, capture each slide headlessly and check for clipping, overlap, and text size. Save the screenshots inside the working folder.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --hide-scrollbars \
  --window-size=1600,900 --screenshot="$PWD/preview/slide-3-en.png" "file://$PWD/$f?lang=en#3"
```

## Saving

Save as a single HTML file at the path the user chose. It does not depend on external files.
