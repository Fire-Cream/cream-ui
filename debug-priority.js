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
    
    // 检查主要按钮的完整类名
    console.log('\n=== 检查主要按钮的完整类名 ===');
    const primaryButtonClasses = await page.locator('.ag-button--primary').first().evaluate(el => {
      return {
        className: el.className,
        hasDisabled: el.classList.contains('is-disabled'),
        hasLoading: el.classList.contains('is-loading'),
      };
    });
    console.log('主要按钮类名:', primaryButtonClasses);
    
    // 检查CSS规则优先级
    console.log('\n=== 检查CSS规则优先级 ===');
    const rulePriorities = await page.evaluate(() => {
      const button = document.querySelector('.ag-button--primary');
      if (!button) return 'No primary button found';
      
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && button.matches(rule.selectorText)) {
              rules.push({
                selector: rule.selectorText,
                specificity: rule.selectorText.split(',').map(s => s.trim()),
              });
            }
          }
        } catch (e) {
          // 跨域样式表无法访问
        }
      }
      return rules;
    });
    console.log('匹配的规则:', rulePriorities);
    
    // 检查是否有禁用样式覆盖
    console.log('\n=== 检查禁用样式 ===');
    const disabledRules = await page.evaluate(() => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('disabled')) {
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
    console.log('禁用相关规则:', disabledRules);
    
    // 手动检查元素样式
    console.log('\n=== 手动检查元素样式 ===');
    const manualCheck = await page.locator('.ag-button--primary').first().evaluate(el => {
      // 获取所有应用的样式
      const computed = window.getComputedStyle(el);
      const inline = el.style;
      
      return {
        computed: {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderColor: computed.borderColor,
        },
        inline: {
          backgroundColor: inline.backgroundColor,
          color: inline.color,
        },
        classList: Array.from(el.classList),
      };
    });
    console.log('手动检查结果:', manualCheck);
    
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
