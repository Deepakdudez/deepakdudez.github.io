const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('1. Preparing source index.html for Vite build...');
if (fs.existsSync('index.source.html')) {
  fs.copyFileSync('index.source.html', 'index.html');
}

console.log('2. Running TypeScript check and Vite build...');
execSync('npx tsc && npx vite build', { stdio: 'inherit' });

console.log('3. Copying dist to root for direct GitHub Pages branch serving...');
if (fs.existsSync('dist/index.html')) {
  fs.copyFileSync('dist/index.html', 'index.html');
}
if (fs.existsSync('dist/assets')) {
  fs.cpSync('dist/assets', 'assets', { recursive: true });
}
fs.writeFileSync('.nojekyll', '');

console.log('✓ Build complete! Both dist/ and root are ready for GitHub Pages.');
