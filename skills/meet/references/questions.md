# Expected questions by perspective

When writing the `Expected questions` of meeting material, check each question below. Put only the questions related to this meeting's content on the slides, with a prepared answer. If no answer could be prepared, say so.

## Statistics and experiment design
- Is this number a measured value, a simulation result, or an estimate? Which run record does it come from?
- Is the difference larger than the noise? What are the variance across seeds, the variance when the same setting is rerun, and the sample size?
- Were the baseline and hyperparameters fixed before seeing the results?
- Are the compared conditions the same? Are the model, generation settings, data split, and budget calculation the same?
- Is an approximation or a proxy metric used? Was its error checked?

## Cost
- At which step do time, tokens, calls, and GPU memory occur, and what are they proportional to?
- Is the unit of comparison correct? Is the unit stated, such as cost per correct answer or performance at the same budget?
- How much GPU time and wall-clock time does the next experiment need?

## Prior work
- Are there accepted papers on the same problem? Where were they published?
- Which line of work does this method belong to, and what does it add? Could it be read as a variant of an existing method?
- Which baselines and additional experiments would a reviewer request?
- Is the dataset suitable for verifying the claim?

## Practical application
- Do the conditions the method assumes hold in real work at the company or in the field?
- Do they hold with the models and resources available at the company?
- What problem can this research be said to solve for practitioners?

## Simplicity and scope
- Can a simpler method give the same answer?
- Is there a component that can be removed without changing the result?
- Has the scope grown beyond the question being answered now?
- Can the question be answered from existing records without a new experiment?

## Completion
- What are the project's goal and deadline, and can it be finished in the remaining time?
- Is progress blocked by a pending decision, a pending result, or a lack of resources?
- What must be decided in this meeting to move toward completion?
