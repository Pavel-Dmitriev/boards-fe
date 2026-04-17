# AGENTS

Rules for automated agents in this repository.

## General

- Communication in Russian.
- All comments on the code are in Russian.
- Make minimal, targeted changes.
- Do not touch files unrelated to the task.
- Do not change existing formatting/lint rules without a request.
- Do not revert or modify others' changes without a request.
- If unsure, choose the simplest option.
- Do not add new dependencies unless necessary.

## Code Style

- Use the `yarn` package manager.
- Use `jsdoc` to describe components, helpers, hooks, types and their properties
- For styles, use tailwindCSS version 4+. If you write styles in a separate file, use the `@apply` directive.
- TypeScript without `any`.
- Simple types only; no overloads or complex compositions.
- Clear names, short functions, readability over abstractions.
- Use `clsx` when classes are stored in a variable.
- Use `function` declarations for handlers.
- Follow SOLID.
