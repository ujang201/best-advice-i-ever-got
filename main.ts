import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The best advice I ever got, as one single sentence (148 characters).
// A real moment, a real voice: my father, the night I lost my first job.
const ENTRY =
  "The night I lost my first job, my father said: never make a permanent decision on a temporary feeling — it has saved me more times than I can count.";

// Guard the gate before writing: 1-200 characters, not only whitespace,
// exactly one sentence (a single terminal period, no trailing newline,
// which would count toward the 200-character cap).
if (
  ENTRY.length < 1 ||
  ENTRY.length > 200 ||
  ENTRY.trim().length === 0 ||
  (ENTRY.match(/\./g) ?? []).length !== 1 ||
  !ENTRY.endsWith(".")
) {
  throw new Error(`Invalid entry (${ENTRY.length} chars): ${ENTRY}`);
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
