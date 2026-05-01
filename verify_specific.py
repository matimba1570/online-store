from pathlib import Path
for name in ['dell-batteries.html', 'dell.html', 'acer-batteries.html', 'check.html']:
    p = Path(name)
    text = p.read_text(encoding='utf-8', errors='ignore')
    print(name, 'contains', 'href="dealers.html"' in text, 'count', text.count('href="dealers.html"'))
