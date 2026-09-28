async function runTests() {
  console.log('--- STARTING PORTFOLIO VERIFICATION SUITE ---');

  // Test 1: Fetch HTML
  const res = await fetch('http://localhost:3001/');
  console.log('1. Root HTML Status:', res.status);
  if (res.status !== 200) throw new Error('Root HTML failed');
  const html = await res.text();

  // Test 2: Check Deepak's Portrait is served
  const imgRes = await fetch('http://localhost:3001/deepak-portrait.jpg');
  console.log('2. Deepak Portrait Status:', imgRes.status, 'Content-Length:', imgRes.headers.get('content-length'));
  if (imgRes.status !== 200) throw new Error('Portrait image failed to load');

  // Test 3: Check bundled CSS and JS
  const jsMatch = html.match(/\/assets\/index-[^"]+\.js/);
  const cssMatch = html.match(/\/assets\/index-[^"]+\.css/);

  if (!jsMatch) throw new Error('JS bundle not found in index.html');
  const jsRes = await fetch('http://localhost:3001' + jsMatch[0]);
  console.log('3. JS Bundle Status:', jsRes.status, 'Length:', (await jsRes.text()).length);

  if (cssMatch) {
    const cssRes = await fetch('http://localhost:3001' + cssMatch[0]);
    console.log('4. CSS Bundle Status:', cssRes.status, 'Length:', (await cssRes.text()).length);
  }

  // Test 4: Verify Content in Bundle
  const jsBundleText = await (await fetch('http://localhost:3001' + jsMatch[0])).text();
  const hasGithub = jsBundleText.includes('Deepakdudez');
  const hasLinkedin = jsBundleText.includes('deep4kkumar');
  const hasAltitudes = jsBundleText.includes('Altitudes');
  const hasSKCET = jsBundleText.includes('Sri Krishna College') || jsBundleText.includes('SKCET');
  const hasAgenticAI = jsBundleText.includes('Agentic AI');
  const hasDecentralizedGrid = jsBundleText.includes('Decentralize Scalable Grid');
  const hasEmail = jsBundleText.includes('deepak.nithyananthan@gmail.com');

  console.log('5. GitHub Deepakdudez verified:', hasGithub);
  console.log('6. LinkedIn deep4kkumar verified:', hasLinkedin);
  console.log('7. Altitudes 2025 Internship verified:', hasAltitudes);
  console.log('8. SKCET Education verified:', hasSKCET);
  console.log('9. Agentic AI & Decentralized Grid verified:', hasAgenticAI && hasDecentralizedGrid);
  console.log('10. Email deepak.nithyananthan@gmail.com verified:', hasEmail);

  if (!hasGithub || !hasLinkedin || !hasAltitudes || !hasSKCET || !hasAgenticAI || !hasDecentralizedGrid || !hasEmail) {
    throw new Error('Key resume verification items missing from bundle');
  }

  console.log('--- ALL AUTOMATED VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
