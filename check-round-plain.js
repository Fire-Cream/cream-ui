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
    
    // 检查所有按钮
    console.log('\n=== 检查所有按钮 ===');
    const buttons = await page.locator('.ag-button').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          className: el.className,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderRadius: styles.borderRadius,
          height: styles.height,
        };
      })
    );
    
    buttons.forEach((btn, i) => {
      console.log(`\n${i + 1}. "${btn.text}"`);
      console.log(`   类名: ${btn.className}`);
      console.log(`   背景色: ${btn.backgroundColor}`);
      console.log(`   文字色: ${btn.color}`);
      console.log(`   圆角: ${btn.borderRadius}`);
      console.log(`   高度: ${btn.height}`);
    });
    
    // 检查圆角按钮
    console.log('\n=== 圆角按钮检查 ===');
    const roundButtons = await page.locator('.is-round').count();
    console.log('圆角按钮数量:', roundButtons);
    
    if (roundButtons > 0) {
      const roundButtonStyles = await page.locator('.is-round').first().evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          borderRadius: styles.borderRadius,
          className: el.className,
        };
      });
      console.log('圆角按钮样式:', roundButtonStyles);
    }
    
    // 检查朴素按钮
    console.log('\n=== 朴素按钮检查 ===');
    const plainButtons = await page.locator('.is-plain').count();
    console.log('朴素按钮数量:', plainButtons);
    
    if (plainButtons > 0) {
      const plainButtonStyles = await page.locator('.is-plain').first().evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          border: styles.border,
          className: el.className,
        };
      });
      console.log('朴素按钮样式:', plainButtonStyles);
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
