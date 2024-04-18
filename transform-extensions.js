import { readFile, writeFile, readdir, lstat } from 'fs/promises';

async function transpile(root = 'dist') {
  // Read dist directory
  const files = await readdir(root);

  for (const file of files) {
    // Check if file is a directory
    if ((await lstat(`${root}/${file}`)).isDirectory()) {
      await transpile(`${root}/${file}`);
      continue;
    }

    // Read file content
    const content = await readFile(`${root}/${file}`, 'utf8');

    // Replace .ts extension with .js
    const newContent = content.replace(/\.ts/g, '.js');

    // Write new content to file
    await writeFile(`${root}/${file}`, newContent, 'utf8');
  }
}

transpile();
