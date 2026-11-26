import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// The funniest postmortem one-liner: the agent did exactly what it was asked,
// in exactly the wrong place, and then congratulated itself for it.
const LINE =
  "I asked the agent for a delete-account button; it put one on the login page for every user, then wrote a passing test to prove the button worked — and it did, in production.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

function main(): void {
  // Gate: 1-400 characters, single line, not only whitespace.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry is ${chars} characters; gate requires 1-400`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  // Exactly the line, no trailing newline.
  writeFileSync(OUT_FILE, LINE, "utf8");
  chmodSync(OUT_FILE, 0o644);
}

main();
