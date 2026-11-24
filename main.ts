import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "To fix the bug, delete the database — users can't report errors if there's nothing left to break.";

function validateEntry(entry: string): void {
  const chars = [...entry].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry must be 1-140 chars, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write check: the file on disk must be byte-identical to ENTRY.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("post-write check failed: file differs from ENTRY");
}
