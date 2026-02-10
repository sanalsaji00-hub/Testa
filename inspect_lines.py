
path = r"d:/Projects/Testa-website/index.html"
with open(path, "rb") as f:
    lines = f.readlines()
    print(lines[840]) # 0-indexed, so line 841 in 1-indexed.
    print(lines[840].decode('utf-8', errors='replace'))
    print(lines[845]) # line 846
    print(lines[845].decode('utf-8', errors='replace'))
