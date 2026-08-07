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
    
    // 检查密码输入框图标
    console.log('\n=== 检查密码输入框图标 ===');
    const passwordInputs = await page.locator('.ag-input__password').evaluateAll(elements => 
      elements.map(el => {
        const svg = el.querySelector('svg');
        const paths = svg ? svg.querySelectorAll('path') : [];
        return {
          hasSvg: !!svg,
          pathCount: paths.length,
          svgViewBox: svg?.getAttribute('viewBox'),
        };
      })
    );
    
    passwordInputs.forEach((input, i) => {
      console.log(`\n密码输入框 ${i + 1}:`);
      console.log(`  有SVG图标: ${input.hasSvg}`);
      console.log(`  路径数量: ${input.pathCount}`);
      console.log(`  SVG viewBox: ${input.svgViewBox}`);
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
