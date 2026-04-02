/** Скрипт, который добавит на проверку линтеру только staged файлы */
import { execSync } from "child_process";

try {
  const files = execSync(
    'git diff --cached --name-only --diff-filter=ACM -- "*.js" "*.jsx" "*.ts" "*.tsx"',
    { encoding: "utf-8" },
  )
    .split("\n")
    .filter(Boolean);

  if (files.length > 0) {
    execSync(`yarn eslint --fix --no-warn-ignored ${files.join(" ")}`, {
      stdio: "inherit",
    });
  }
} catch (error) {
  process.exit(1);
}
