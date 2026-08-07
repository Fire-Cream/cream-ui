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
    
    // 检查所有按钮
    console.log('\n=== 检查所有按钮 ===');
    const allButtons = await page.locator('.ag-button').evaluateAll(elements => 
      elements.map(el => {
        const classes = el.className;
        const text = el.textContent?.trim();
        const isLoading = el.classList.contains('is-loading');
        return {
          text,
          isLoading,
          classes,
        };
      })
    );
    
    console.log('总按钮数量:', allButtons.length);
    
    // 检查加载按钮
    const loadingButtons = allButtons.filter(btn => btn.isLoading);
    console.log('加载按钮数量:', loadingButtons.length);
    
    loadingButtons.forEach((btn, i) => {
      console.log(`\n${i + 1}. "${btn.text}"`);
      console.log(`   类名: ${btn.classes}`);
    });
    
    // 如果没有找到加载按钮，检查页面HTML
    if (loadingButtons.length === 0) {
      console.log('\n=== 检查页面HTML ===');
      const bodyHTML = await page.locator('body').innerHTML();
      console.log('页面HTML包含loading:', bodyHTML.includes('loading'));
      console.log('页面HTML包含is-loading:', bodyHTML.includes('is-loading'));
    }
    
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
