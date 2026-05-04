import os
import re

root = '.'
changed = []
for dirpath, dirnames, filenames in os.walk(root):
    for fn in filenames:
        if not fn.lower().endswith(('.html', '.htm')):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
        orig = text
        text = text.replace('href="dealer.html"', 'href="dealers.html"')
        text = text.replace("href='dealer.html'", "href='dealers.html'")

        if fn.lower() == 'dealers.html':
            text = re.sub(r'<li class="nav-item">\s*<li class="nav-item"><a href="dealers\.html">Dealer</a></li>\s*</li>',
                          r'<li class="nav-item"><a href="dealers.html">Dealer</a></li>', text)

        if 'Back to Brands' in text and 'href="dealers.html"' not in text:
            text = text.replace('Back to Brands</a>',
                                'Back to Brands</a><a href="dealers.html" style="color: white; text-decoration: none; margin-left: 20px;">Dealers</a>')

        if '<ul class="nav-links">' in text and 'href="dealers.html"' not in text:
            text = re.sub(r'(<li class="nav-item"><a href="contact\.html">Contact</a></li>)',
                          r'<li class="nav-item"><a href="dealers.html">Dealer</a></li>\n        \1', text)

        if '<h4>Quick Links</h4>' in text and 'href="dealers.html"' not in text:
            m = re.search(r'(<h4>Quick Links</h4>.*?<ul>)(.*?)(</ul>)', text, flags=re.S)
            if m:
                block = m.group(2)
                if 'href="dealers.html"' not in block:
                    insert = '\n          <li><a href="dealers.html"><i class="fas fa-angle-right"></i> Dealer</a></li>'
                    text = text[:m.start(3)] + insert + text[m.start(3):]

        if text != orig:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            changed.append(path)

print('changed', len(changed))
for p in changed:
    print(p)
