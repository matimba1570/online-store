from pathlib import Path
f = Path('acer-batteries.html')
text = f.read_text(encoding='utf-8')
print('scriptjs' in text)
print('searchjs' in text)
print('src="script.js"' in text)
print('src="search.js"' in text)
print(text[text.index('script.js')-10:text.index('script.js')+20])
