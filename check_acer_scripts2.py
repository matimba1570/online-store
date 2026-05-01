from pathlib import Path

base = Path(r'C:\Users\huawei\Documents\online-store')
files = sorted(base.glob('acer*.html'))
for f in files:
    text = f.read_text(encoding='utf-8')
    has_script = 'src="script.js"' in text or "src='script.js'" in text
    has_search = 'src="search.js"' in text or "src='search.js'" in text
    print(f.name, has_script, has_search)
