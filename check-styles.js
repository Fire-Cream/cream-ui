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
    
    // 监听控制台错误
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('CONSOLE ERROR:', msg.text());
      }
    });
    
    console.log('Navigating to playground...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'playground-screenshot.png', fullPage: true });
    console.log('Screenshot saved to playground-screenshot.png');
    
    // 检查按钮样式
    console.log('\n=== 检查按钮样式 ===');
    const buttonStyles = await page.locator('.ag-button').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
      };
    });
    console.log('First button computed styles:', buttonStyles);
    
    // 检查主要按钮样式
    const primaryButtonStyles = await page.locator('.ag-button--primary').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });
    console.log('Primary button styles:', primaryButtonStyles);
    
    // 检查是否有样式表加载
    const styleSheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => ({
        href: sheet.href,
        rules: sheet.cssRules?.length || 0,
      }));
    });
    console.log('\n=== 加载的样式表 ===');
    styleSheets.forEach(sheet => {
      console.log(`  ${sheet.href || 'inline'}: ${sheet.rules} rules`);
    });
    
    // 检查ag-button类是否有样式
    const buttonCSSRules = await page.evaluate(() => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('ag-button')) {
              rules.push(rule.selectorText);
            }
          }
        } catch (e) {
          // 跨域样式表无法访问
        }
      }
      return rules;
    });
    console.log('\n=== ag-button CSS规则 ===');
    console.log('Found rules:', buttonCSSRules.length);
    if (buttonCSSRules.length > 0) {
      console.log('Sample rules:', buttonCSSRules.slice(0, 5));
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
