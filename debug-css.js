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
    
    // 检查CSS规则
    console.log('\n=== 检查CSS规则 ===');
    const cssRules = await page.evaluate(() => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('ag-button--primary')) {
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
    
    console.log('找到的ag-button--primary规则:');
    cssRules.forEach(rule => {
      console.log(`\n选择器: ${rule.selector}`);
      console.log(`CSS: ${rule.cssText}`);
    });
    
    // 检查所有ag-button相关规则
    console.log('\n=== 检查所有ag-button规则 ===');
    const allButtonRules = await page.evaluate(() => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('ag-button')) {
              rules.push({
                selector: rule.selectorText,
                cssText: rule.cssText.substring(0, 200) + '...',
              });
            }
          }
        } catch (e) {
          // 跨域样式表无法访问
        }
      }
      return rules;
    });
    
    console.log(`找到 ${allButtonRules.length} 条ag-button规则`);
    allButtonRules.slice(0, 10).forEach(rule => {
      console.log(`\n选择器: ${rule.selector}`);
      console.log(`CSS: ${rule.cssText}`);
    });
    
    // 检查主要按钮的匹配规则
    console.log('\n=== 主要按钮匹配的规则 ===');
    const matchedRules = await page.locator('.ag-button--primary').first().evaluate(el => {
      const matched = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && el.matches(rule.selectorText)) {
              matched.push({
                selector: rule.selectorText,
                cssText: rule.cssText,
              });
            }
          }
        } catch (e) {
          // 跨域样式表无法访问
        }
      }
      return matched;
    });
    
    console.log(`主要按钮匹配了 ${matchedRules.length} 条规则`);
    matchedRules.forEach(rule => {
      console.log(`\n选择器: ${rule.selector}`);
      console.log(`CSS: ${rule.cssText.substring(0, 300)}...`);
    });
    
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
