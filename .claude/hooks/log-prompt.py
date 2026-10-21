#!/usr/bin/env python3
"""UserPromptSubmit hook: append each prompt to prompts.txt in a readable format."""
import json, os, sys, datetime

data = json.load(sys.stdin)
prompt = data.get("prompt", "").strip()
root = os.environ.get("CLAUDE_PROJECT_DIR", data.get("cwd", "."))
path = os.path.join(root, "prompts.txt")
if not prompt:
    sys.exit(0)

existing = open(path).read() if os.path.exists(path) else ""
n = existing.count("\nPROMPT ") + existing.startswith("PROMPT ") + 1
stamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
with open(path, "a") as f:
    f.write(f"PROMPT {n}  ({stamp})\n{'=' * 60}\n{prompt}\n\n\n")
