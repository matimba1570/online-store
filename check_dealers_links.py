import os

root = '.'
missing = []
for dirpath, dirnames, filenames in os.walk(root):
    for fn in filenames:
        if not fn.lower().endswith(('.html', '.htm')):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
        if 'href="dealers.html"' not in text:
            missing.append(path)

print('total_html_files', sum(1 for dirpath, dirnames, filenames in os.walk(root) for fn in filenames if fn.lower().endswith(('.html','.htm'))))
print('missing_dealers_link', len(missing))
for p in missing:
    print(p)
