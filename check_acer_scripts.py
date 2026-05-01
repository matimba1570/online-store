from pathlib import Path

base = Path(r'C:\Users\huawei\Documents\online-store')
files = sorted(base.glob('acer*.html'))
missing = []
for f in files:
    text = f.read_text(encoding='utf-8')
    has_script = 'src="script.js"' in text or "src='script.js'" in text
    has_search = 'src="search.js"' in text or "src='search.js'" in text
    if not has_script or not has_search:
        missing.append((f.name, has_script, has_search))

if missing:
    for name, has_script, has_search in missing:
        print(name, 'script.js' if not has_script else '', 'search.js' if not has_search else '')
else:
    print('All Acer files include script.js and search.js')
