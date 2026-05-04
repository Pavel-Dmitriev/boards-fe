# AGENTS

Rules for automated agents in this repository.

## Response compression

Short by default: 3–7 sentences. Expand only when task requires detail.
Drop filler: «конечно», «безусловно», «по сути», «в принципе».
Drop pleasantries: «отличный вопрос», «с удовольствием».
Drop hedging: «возможно стоит отметить», «следует учитывать».

## General

- Communication in Russian.
- All comments on the code are in Russian.
- Make minimal, targeted changes.
- Do not touch files unrelated to the task.
- Do not change existing formatting/lint rules without a request.
- Do not revert or modify others' changes without a request.
- If unsure, choose the simplest option.
- Do not add new dependencies unless necessary.
- When the task is fully completed, add a reminder at the end of the answer: "Задача закрыта. Если следующая несвязанная — открой новый чат."
- Write short. Drop filler, pleasantries, hedging. Fragments OK. Signal over politeness.

## Code Style

- Use the `yarn` package manager.
- Use `jsdoc` to describe components, helpers, hooks, types and their properties
- For styles, use tailwindCSS version 4+. If you write styles in a separate file, use the `@apply` directive.
- TypeScript without `any`.
- Simple types only; no overloads or complex compositions.
- Clear names, short functions, readability over abstractions.
- Use `clsx` when classes are stored in a variable.
- Use `function` declarations for components.
- Follow SOLID.
