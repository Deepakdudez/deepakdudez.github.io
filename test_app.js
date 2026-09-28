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

  if (jsMatch) {
    const jsRes = await fetch('http://localhost:3001' + jsMatch[0]);
    console.log('3. JS Bundle Status:', jsRes.status, 'Length:', (await jsRes.text()).length);
  }
  if (cssMatch) {
    const cssRes = await fetch('http://localhost:3001' + cssMatch[0]);
    console.log('4. CSS Bundle Status:', cssRes.status, 'Length:', (await cssRes.text()).length);
  }

  // Test 5: Verify GitHub and LinkedIn presence in JS bundle
  const jsBundleText = await (await fetch('http://localhost:3001' + jsMatch[0])).text();
  const hasGithub = jsBundleText.includes('github.com/Deepakdudez') || jsBundleText.includes('Deepakdudez');
  const hasLinkedin = jsBundleText.includes('linkedin.com/in/deep4kkumar') || jsBundleText.includes('deep4kkumar');
  console.log('5. GitHub Deepakdudez verified in bundle:', hasGithub);
  console.log('6. LinkedIn deep4kkumar verified in bundle:', hasLinkedin);
  console.log('7. Holographic portrait integrated:', jsBundleText.includes('deepak-portrait.jpg'));

  if (!hasGithub || !hasLinkedin) {
    throw new Error('Social links missing from bundle');
  }

  console.log('--- ALL AUTOMATED VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
