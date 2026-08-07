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
    
    // 检查按钮
    console.log('\n=== 检查按钮 ===');
    const buttons = await page.locator('.ag-button').count();
    console.log('找到按钮数量:', buttons);
    
    if (buttons > 0) {
      // 获取第一个按钮的样式
      const firstButtonStyles = await page.locator('.ag-button').first().evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          className: el.className,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          height: styles.height,
        };
      });
      console.log('第一个按钮样式:', firstButtonStyles);
      
      // 获取主要按钮的样式
      const primaryButton = await page.locator('.ag-button--primary').first();
      if (await primaryButton.count() > 0) {
        const primaryStyles = await primaryButton.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            text: el.textContent?.trim(),
            className: el.className,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
          };
        });
        console.log('主要按钮样式:', primaryStyles);
      }
    }
    
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
