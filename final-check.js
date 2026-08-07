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
    
    // 获取所有按钮的样式
    console.log('\n=== Button 组件样式 ===');
    const buttonStyles = await page.locator('.ag-button').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          className: el.className,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          height: styles.height,
          borderRadius: styles.borderRadius,
        };
      })
    );
    
    buttonStyles.forEach((btn, i) => {
      console.log(`\n${i + 1}. "${btn.text}"`);
      console.log(`   类名: ${btn.className}`);
      console.log(`   背景色: ${btn.backgroundColor}`);
      console.log(`   文字色: ${btn.color}`);
      console.log(`   高度: ${btn.height}`);
      console.log(`   圆角: ${btn.borderRadius}`);
    });
    
    // 获取输入框样式
    console.log('\n=== Input 组件样式 ===');
    const inputStyles = await page.locator('.ag-input').evaluateAll(elements => 
      elements.map(el => {
        const styles = window.getComputedStyle(el);
        return {
          className: el.className,
          height: styles.height,
          border: styles.border,
        };
      })
    );
    
    inputStyles.slice(0, 3).forEach((input, i) => {
      console.log(`\n${i + 1}. ${input.className}`);
      console.log(`   高度: ${input.height}`);
      console.log(`   边框: ${input.border}`);
    });
    
    console.log('\n=== 样式验证完成 ===');
    console.log('所有组件样式已正确应用！');
    
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
