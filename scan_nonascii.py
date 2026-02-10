
import re

path = r"d:/Projects/Testa-website/index.html"
with open(path, "rb") as f:
    content = f.read()

# Find non-ascii bytes
# We want to find sequences of bytes that are > 127
matches = []
for i, byte in enumerate(content):
    if byte > 127:
        # Check if this index is already part of a sequence we found
        if matches and matches[-1]['end'] > i:
            continue
        
        # Start of a new sequence
        start = i
        end = i
        while end < len(content) and content[end] > 127:
            end += 1
        
        # Grab some context
        context_start = max(0, start - 20)
        context_end = min(len(content), end + 20)
        
        matches.append({
            'start': start,
            'end': end,
            'bytes': content[start:end],
            'context': content[context_start:context_end]
        })

print(f"Found {len(matches)} sequences of non-ASCII bytes.")
for m in matches:
    try:
        ctx_str = m['context'].decode('utf-8', errors='replace')
        bytes_hex = m['bytes'].hex(' ')
        print(f"Position {m['start']}-{m['end']}: [{bytes_hex}] Context: {ctx_str!r}")
    except Exception as e:
        print(f"Error printing match at {m['start']}: {e}")
