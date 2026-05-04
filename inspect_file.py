from pathlib import Path
path = Path('dell-batteries.html')
text = path.read_text(encoding='utf-8', errors='ignore').splitlines()
for i, line in enumerate(text, 1):
    if 'dealers.html' in line or 'dealer.html' in line:
        print(i, repr(line))
