import fs from 'node:fs';
import path from 'node:path';

const __dirname = import.meta.dirname;
const SRC_DIR = path.resolve(__dirname, '../src/procedures');
const OUT_FILE = path.resolve(__dirname, '../src/types/procedure.generated.d.ts');

const files = fs.globSync('**/*.js', { cwd: SRC_DIR });

/** @type {{fnName:string, relPath:string}[]} */
const entries = [];

const defineRe = /Procedure\.define\(\s*['"]([^'"]+)['"]\s*,\s*(\w+)\s*\)/g;

for (const file of files) {
  const fullPath = path.join(SRC_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  let m;
  while ((m = defineRe.exec(content)) !== null) {
    const [, registeredName, fnName] = m;
    entries.push({
      registeredName,
      fnName,
      relPath: './' + path.relative(path.dirname(OUT_FILE), fullPath).replace(/\\/g, '/'),
    });
  }
}

const references = [...new Set(entries.map(e => `/// <reference path="${e.relPath}" />`))].join('\n');

const members = entries
  .map(e => `  ${JSON.stringify(e.registeredName)}: typeof ${e.fnName};`)
  .join('\n');

const output = `// このファイルは自動生成されます。手動編集しないでください。
${references}

interface ProcedureRegistry {
${members}
}
`;

fs.writeFileSync(OUT_FILE, output, 'utf-8');
console.log(`Generated ${entries.length} procedure(s) -> ${OUT_FILE}`);