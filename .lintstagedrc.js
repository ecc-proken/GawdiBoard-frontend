module.exports = {
  '**/*.{ts,tsx}': () => 'tsc',
  '*.{js,ts,tsx}': (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`,
  '*.{js,ts,tsx,json}': (filenames) =>
    `prettier --write --ignore-path .gitignore ${filenames.join(' ')}`,
};
