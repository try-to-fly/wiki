const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(process.cwd(), 'pages/docs');
const OUTPUT = path.resolve(process.cwd(), 'scripts/docs-index-meta.json');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

function parseTitle(content, filename) {
  const frontMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontMatch) {
    const titleMatch = frontMatch[1].match(/title:\s*(.+)/);
    if (titleMatch) {
      return titleMatch[1].replace(/^['"]|['"]$/g, '').trim();
    }
  }
  const headingMatch = content.match(/^#\s+(.+)/m);
  if (headingMatch) return headingMatch[1].trim();
  return path.basename(filename, path.extname(filename));
}

function buildSummary(files) {
  const summary = {};
  const fileInfos = [];

  for (const file of files) {
    const rel = path.relative(BASE_DIR, file);
    const content = fs.readFileSync(file, "utf8");
    const title = parseTitle(content, file);
    const segments = rel.split(path.sep);
    const top = segments[0] || "(root)";
    const info = { title, rel, segments };
    fileInfos.push(info);

    if (!summary[top]) summary[top] = { count: 0, rootFiles: [], subdirs: {} };
    summary[top].count += 1;

    if (segments.length === 1) {
      summary[top].rootFiles.push({ title, rel });
    } else {
      const sub = segments[1];
      if (!summary[top].subdirs[sub])
        summary[top].subdirs[sub] = { count: 0, files: [] };
      summary[top].subdirs[sub].count += 1;
      summary[top].subdirs[sub].files.push({ title, rel });
    }
  }

  return { summary, fileInfos };
}

(function main() {
  if (!fs.existsSync(BASE_DIR)) {
    console.error('目录不存在:', BASE_DIR);
    process.exit(1);
  }

  const files = walk(BASE_DIR);
  const { summary, fileInfos } = buildSummary(files);
  const payload = {
    total: files.length,
    generatedAt: new Date().toISOString(),
    topLevel: Object.keys(summary)
      .sort()
      .map((name) => ({
        name,
        count: summary[name].count,
        rootFiles: summary[name].rootFiles,
        subdirs: Object.keys(summary[name].subdirs)
          .sort()
          .map((sub) => ({
            name: sub,
            count: summary[name].subdirs[sub].count,
            sample: summary[name].subdirs[sub].files.slice(0, 5),
          })),
      })),
    files: fileInfos,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(payload, null, 2));
  console.log(`已生成 ${OUTPUT}，共 ${files.length} 篇文档。`);
})();
