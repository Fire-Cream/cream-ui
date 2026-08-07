const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {
  // 启动开发服务器
  console.log('Starting dev server...');
  const server = spawn('pnpm', ['dev'], { 
    cwd: 'D:\\Project\\cream-ui',
    shell: true,
    stdio: 'pipe'
  });

  // 等待服务器启动
  console.log('Waiting for server to start...');
  await new Promise(resolve => setTimeout(resolve, 8000));

  let browser;
  try {
    browser = await chromium.launch({ 
      headless: true,
      channel: 'chrome'
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    
    console.log('Navigating to playground...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'playground-screenshot.png', fullPage: true });
    console.log('Screenshot saved to playground-screenshot.png');
    
    // 检查图标按钮
    console.log('\n=== 检查图标按钮 ===');
    const circleButtons = await page.locator('.is-circle').evaluateAll(elements => 
      elements.map(el => {
        const iconSpan = el.querySelector('.ag-button__icon');
        const svg = iconSpan ? iconSpan.querySelector('svg') : null;
        return {
          text: el.textContent?.trim(),
          hasIcon: !!iconSpan,
          hasSvg: !!svg,
          svgContent: svg ? svg.outerHTML.substring(0, 100) : null,
          className: el.className,
        };
      })
    );
    
    circleButtons.forEach((btn, i) => {
      console.log(`\n${i + 1}. ${btn.className}`);
      console.log(`   有图标span: ${btn.hasIcon}`);
      console.log(`   有SVG: ${btn.hasSvg}`);
      console.log(`   SVG内容: ${btn.svgContent}`);
    });
    
    // 检查禁用按钮
    console.log('\n=== 检查禁用按钮 ===');
    const disabledButtons = await page.locator('.is-disabled').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor,
        };
      })
    );
    
    disabledButtons.forEach((btn, i) => {
      console.log(`\n${i + 1}. "${btn.text}"`);
      console.log(`   背景色: ${btn.backgroundColor}`);
      console.log(`   文字色: ${btn.color}`);
      console.log(`   边框色: ${btn.borderColor}`);
    });
    
    console.log('\n=== 验证完成 ===');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.kill();
    console.log('\nServer stopped');
  }
})();
