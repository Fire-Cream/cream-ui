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
    
    // 检查所有按钮类型
    console.log('\n=== 检查所有按钮类型 ===');
    
    // 普通按钮
    console.log('\n1. 普通按钮:');
    const normalButtons = await page.locator('.ag-button:not(.is-plain):not(.is-round):not(.is-dashed):not(.is-circle)').evaluateAll(elements => 
      elements.slice(0, 3).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      })
    );
    normalButtons.forEach(btn => {
      console.log(`   "${btn.text}": 背景色=${btn.backgroundColor}, 文字色=${btn.color}`);
    });
    
    // 朴素按钮
    console.log('\n2. 朴素按钮:');
    const plainButtons = await page.locator('.is-plain').evaluateAll(elements => 
      elements.slice(0, 3).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      })
    );
    plainButtons.forEach(btn => {
      console.log(`   "${btn.text}": 背景色=${btn.backgroundColor}, 文字色=${btn.color}`);
    });
    
    // 圆角按钮
    console.log('\n3. 圆角按钮:');
    const roundButtons = await page.locator('.is-round').evaluateAll(elements => 
      elements.slice(0, 3).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          borderRadius: styles.borderRadius,
        };
      })
    );
    roundButtons.forEach(btn => {
      console.log(`   "${btn.text}": 圆角=${btn.borderRadius}`);
    });
    
    // 虚线按钮
    console.log('\n4. 虚线按钮:');
    const dashedButtons = await page.locator('.is-dashed').evaluateAll(elements => 
      elements.slice(0, 3).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          borderStyle: styles.borderStyle,
          borderColor: styles.borderColor,
        };
      })
    );
    dashedButtons.forEach(btn => {
      console.log(`   "${btn.text}": 边框样式=${btn.borderStyle}, 边框颜色=${btn.borderColor}`);
    });
    
    // 图标按钮
    console.log('\n5. 图标按钮:');
    const circleButtons = await page.locator('.is-circle').evaluateAll(elements => 
      elements.slice(0, 3).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          borderRadius: styles.borderRadius,
          width: styles.width,
          height: styles.height,
        };
      })
    );
    circleButtons.forEach(btn => {
      console.log(`   "${btn.text}": 圆角=${btn.borderRadius}, 宽度=${btn.width}, 高度=${btn.height}`);
    });
    
    console.log('\n=== 按钮类型验证完成 ===');
    
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
