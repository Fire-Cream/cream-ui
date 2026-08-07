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
  await new Promise(resolve => setTimeout(resolve, 10000));

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
    
    // 检查加载按钮
    console.log('\n=== 检查加载按钮 ===');
    const loadingButtons = await page.locator('.is-loading').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        const loadingSpan = el.querySelector('.ag-button__loading');
        const loadingIcon = el.querySelector('.ag-button__loading-icon');
        const loadingStyles = loadingSpan ? window.getComputedStyle(loadingSpan) : null;
        const iconStyles = loadingIcon ? window.getComputedStyle(loadingIcon) : null;
        
        return {
          text: el.textContent?.trim(),
          height: styles.height,
          lineHeight: styles.lineHeight,
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent,
          loadingSpanDisplay: loadingStyles?.display,
          loadingSpanAlignItems: loadingStyles?.alignItems,
          loadingSpanJustifyContent: loadingStyles?.justifyContent,
          loadingIconDisplay: iconStyles?.display,
          loadingIconVerticalAlign: iconStyles?.verticalAlign,
        };
      })
    );
    
    loadingButtons.forEach((btn, i) => {
      console.log(`\n${i + 1}. "${btn.text}"`);
      console.log(`   按钮高度: ${btn.height}`);
      console.log(`   按钮行高: ${btn.lineHeight}`);
      console.log(`   按钮display: ${btn.display}`);
      console.log(`   按钮alignItems: ${btn.alignItems}`);
      console.log(`   按钮justifyContent: ${btn.justifyContent}`);
      console.log(`   加载span display: ${btn.loadingSpanDisplay}`);
      console.log(`   加载span alignItems: ${btn.loadingSpanAlignItems}`);
      console.log(`   加载span justifyContent: ${btn.loadingSpanJustifyContent}`);
      console.log(`   加载图标 display: ${btn.loadingIconDisplay}`);
      console.log(`   加载图标 verticalAlign: ${btn.loadingIconVerticalAlign}`);
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
