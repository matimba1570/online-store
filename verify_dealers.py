from pathlib import Path

path = Path('dell-batteries.html')
text = path.read_text(encoding='utf-8', errors='ignore')
print('contains dealers link:', 'href="dealers.html"' in text)
print('count:', text.count('href="dealers.html"'))
