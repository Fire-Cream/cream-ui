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
  await new Promise(resolve => setTimeout(resolve, 5000));

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
    
    // 获取所有按钮的完整类名和样式
    console.log('\n=== 按钮详细信息 ===');
    const buttonDetails = await page.locator('.ag-button').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          className: el.className,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          height: styles.height,
          border: styles.border,
        };
      })
    );
    
    buttonDetails.forEach((btn, i) => {
      console.log(`\n按钮 ${i + 1}: "${btn.text}"`);
      console.log(`  类名: ${btn.className}`);
      console.log(`  背景色: ${btn.backgroundColor}`);
      console.log(`  文字色: ${btn.color}`);
      console.log(`  高度: ${btn.height}`);
      console.log(`  边框: ${btn.border}`);
    });
    
    // 检查主要按钮的样式
    console.log('\n=== 主要按钮样式检查 ===');
    const primaryButton = await page.locator('.ag-button--primary').first();
    if (await primaryButton.count() > 0) {
      const primaryStyles = await primaryButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor,
        };
      });
      console.log('主要按钮样式:', primaryStyles);
    } else {
      console.log('未找到主要按钮');
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
