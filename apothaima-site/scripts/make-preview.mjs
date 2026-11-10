// Φτιάχνει ένα αντίγραφο του dist/ με σχετικά links (dist-preview/),
// ώστε το site να ανοίγει και χωρίς server (π.χ. ως preview). Δεν χρειάζεται για το Vercel.
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'dist', OUT = 'dist-preview';
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true });

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

for (const file of walk(OUT)) {
  const rel = path.relative(path.dirname(file), OUT) || '.';
  const pre = rel === '.' ? './' : rel + '/';
  if (file.endsWith('.html')) {
    let h = fs.readFileSync(file, 'utf8');
    const fix = (p) => {
      if (p.startsWith('//')) return p;
      let x = p.slice(1);
      const [pathPart, hash = ''] = x.split('#');
      let out = pathPart;
      if (out === '' || out.endsWith('/')) out += 'index.html';
      return pre + out + (hash ? '#' + hash : '');
    };
    h = h.replace(/(href|src|data-full)="(\/[^"]*)"/g, (_, a, p) => `${a}="${fix(p)}"`);
    h = h.replace(/srcset="([^"]*)"/g, (_, s) => `srcset="${s.replace(/(^|,\s*)\/(_astro\/)/g, `$1${pre}$2`)}"`);
    h = h.replace(/url\(\/_astro\//g, `url(${pre}_astro/`);
    fs.writeFileSync(file, h);
  } else if (file.endsWith('.css')) {
    const c = fs.readFileSync(file, 'utf8').replace(/url\(\/_astro\//g, 'url(./');
    fs.writeFileSync(file, c);
  }
}
// Ο φάκελος _astro μετονομάζεται σε assets (το preview δεν δέχεται ονόματα που ξεκινούν με _).
fs.renameSync(path.join(OUT, '_astro'), path.join(OUT, 'assets'));
for (const file of walk(OUT)) {
  if (file.endsWith('.html') || file.endsWith('.css')) {
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('_astro/', 'assets/'));
  }
}
console.log('preview ready in', OUT);
