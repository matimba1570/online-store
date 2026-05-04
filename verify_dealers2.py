import os
from pathlib import Path

root = Path('.')
missing = []
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8', errors='ignore')
    if 'href="dealers.html"' not in text and "onclick=\"location.href='dealers.html'\"" not in text:
        missing.append(path)

print('total_html_files', sum(1 for _ in root.rglob('*.html')))
print('missing_dealers_link', len(missing))
for m in missing:
    print(m)
