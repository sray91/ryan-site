import puppeteer from 'puppeteer';

const sites = [
  { url: 'https://portfolio.ryancahalane.com', file: 'portfolio.png' },
  { url: 'https://ops-maturity.ryancahalane.com', file: 'ops-maturity.png' },
  { url: 'https://genomesim.ryancahalane.com', file: 'genomesim.png' },
];

const browser = await puppeteer.launch({ headless: true });

for (const site of sites) {
  console.log(`Capturing ${site.url}...`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: `public/screenshots/${site.file}` });
  await page.close();
  console.log(`  Saved public/screenshots/${site.file}`);
}

await browser.close();
console.log('Done.');
