
path = r"d:/Projects/Testa-website/index.html"
with open(path, "rb") as f:
    content = f.read()

# Pattern for â€ (invisible char) -> ”
# Found bytes: \xc3\xa2\xe2\x82\xac\xc2\x9d
garbage_quote = b'\xc3\xa2\xe2\x82\xac\xc2\x9d'
clean_quote = b'\xe2\x80\x9d' # Right Double Quote ”

if garbage_quote in content:
    print(f"Found {content.count(garbage_quote)} occurrences of garbage quote.")
    content = content.replace(garbage_quote, clean_quote)
else:
    print("Garbage quote not found.")

with open(path, "wb") as f:
    f.write(content)
print("File updated.")
