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
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    
    // 监听控制台消息
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    console.log('Navigating to playground...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'playground-screenshot.png', fullPage: true });
    console.log('Screenshot saved to playground-screenshot.png');
    
    // 获取页面标题
    const title = await page.title();
    console.log('Page title:', title);
    
    // 获取页面HTML内容
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('Body HTML:', bodyHTML.substring(0, 1000));
    
    // 检查是否有按钮组件
    const buttons = await page.locator('button').count();
    console.log('Number of buttons found:', buttons);
    
    // 检查是否有ag-button组件
    const agButtons = await page.locator('ag-button').count();
    console.log('Number of ag-button elements found:', agButtons);
    
    // 检查是否有.ag-button类的元素
    const agButtonClass = await page.locator('.ag-button').count();
    console.log('Number of .ag-button class elements found:', agButtonClass);
    
    // 获取所有元素
    const allElements = await page.locator('*').count();
    console.log('Total elements on page:', allElements);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.kill();
    console.log('Server stopped');
  }
})();
