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
    
    // 检查按钮文本
    console.log('\n=== 检查按钮文本 ===');
    const buttons = await page.locator('.ag-button').evaluateAll(elements => 
      elements.slice(0, 10).map(el => ({
        text: el.textContent?.trim(),
        className: el.className,
      }))
    );
    
    buttons.forEach((btn, i) => {
      console.log(`${i + 1}. "${btn.text}" - ${btn.className}`);
    });
    
    // 检查输入框图标
    console.log('\n=== 检查输入框图标 ===');
    const inputs = await page.locator('.ag-input').evaluateAll(elements => 
      elements.map(el => {
        const clearBtn = el.querySelector('.ag-input__clear');
        const passwordBtn = el.querySelector('.ag-input__password');
        const clearStyles = clearBtn ? window.getComputedStyle(clearBtn) : null;
        const passwordStyles = passwordBtn ? window.getComputedStyle(passwordBtn) : null;
        
        return {
          hasClear: !!clearBtn,
          hasPassword: !!passwordBtn,
          clearPosition: clearStyles?.position,
          clearRight: clearStyles?.right,
          clearTop: clearStyles?.top,
          passwordPosition: passwordStyles?.position,
          passwordRight: passwordStyles?.right,
          passwordTop: passwordStyles?.top,
        };
      })
    );
    
    inputs.forEach((input, i) => {
      console.log(`\n输入框 ${i + 1}:`);
      console.log(`  有清除按钮: ${input.hasClear}`);
      console.log(`  有密码按钮: ${input.hasPassword}`);
      if (input.hasClear) {
        console.log(`  清除按钮位置: position=${input.clearPosition}, right=${input.clearRight}, top=${input.clearTop}`);
      }
      if (input.hasPassword) {
        console.log(`  密码按钮位置: position=${input.passwordPosition}, right=${input.passwordRight}, top=${input.passwordTop}`);
      }
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
