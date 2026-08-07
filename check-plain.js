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
    
    // 检查朴素按钮和普通按钮的区别
    console.log('\n=== 朴素按钮 vs 普通按钮 ===');
    
    // 普通主要按钮
    const normalPrimary = await page.locator('.ag-button--primary').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        text: el.textContent?.trim(),
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
        className: el.className,
      };
    });
    console.log('普通主要按钮:', normalPrimary);
    
    // 朴素主要按钮
    const plainPrimary = await page.locator('.is-plain').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        text: el.textContent?.trim(),
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
        className: el.className,
      };
    });
    console.log('朴素主要按钮:', plainPrimary);
    
    // 检查CSS规则
    console.log('\n=== 检查朴素按钮CSS规则 ===');
    const plainRules = await page.evaluate(() => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('is-plain')) {
              rules.push({
                selector: rule.selectorText,
                cssText: rule.cssText,
              });
            }
          }
        } catch (e) {
          // 跨域样式表无法访问
        }
      }
      return rules;
    });
    console.log('朴素按钮CSS规则:', plainRules);
    
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
