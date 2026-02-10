
path = r"d:/Projects/Testa-website/index.html"

replacements = [
    # En dash roughly: â€“
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9c', b'\xe2\x80\x93'), 
    # Left pointing angle ‹ roughly: â€¹
    (b'\xc3\xa2\xe2\x82\xac\xc2\xb9', b'\xe2\x80\xb9'),
    # Right pointing angle › roughly: â€º
    (b'\xc3\xa2\xe2\x82\xac\xc2\xba', b'\xe2\x80\xba'),
    # Right single quote ’ roughly: â€™
    (b'\xc3\xa2\xe2\x82\xac\xe2\x84\xa2', b'\xe2\x80\x99'),
    # Star ★ roughly: â˜…
    (b'\xc3\xa2\xcb\x9c\xe2\x80\xa6', b'\xe2\x98\x85'),
]

with open(path, "rb") as f:
    content = f.read()

count = 0
for bad, good in replacements:
    c = content.count(bad)
    if c > 0:
        print(f"Found {c} occurrences of {bad.hex(' ')}")
        content = content.replace(bad, good)
        count += c

if count > 0:
    with open(path, "wb") as f:
        f.write(content)
    print(f"Fixed {count} issues.")
else:
    print("No issues found from the list.")
