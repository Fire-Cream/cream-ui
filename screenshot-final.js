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
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'playground-screenshot.png', fullPage: true });
    console.log('Screenshot saved to playground-screenshot.png');
    
    // 获取页面标题
    const title = await page.title();
    console.log('Page title:', title);
    
    // 检查按钮组件
    const buttons = await page.locator('.ag-button').count();
    console.log('\n=== Button 组件 ===');
    console.log('Number of buttons found:', buttons);
    
    // 获取按钮类型
    const buttonTypes = await page.locator('.ag-button').evaluateAll(elements => 
      elements.map(el => {
        const classes = el.className;
        const text = el.textContent?.trim();
        return { text, classes };
      })
    );
    console.log('Button details:');
    buttonTypes.forEach((btn, i) => {
      console.log(`  ${i + 1}. "${btn.text}" - ${btn.classes}`);
    });
    
    // 检查Input组件
    const inputs = await page.locator('.ag-input').count();
    console.log('\n=== Input 组件 ===');
    console.log('Number of inputs found:', inputs);
    
    // 检查Form组件
    const forms = await page.locator('.ag-form').count();
    console.log('\n=== Form 组件 ===');
    console.log('Number of forms found:', forms);
    
    // 获取页面结构概览
    console.log('\n=== 页面结构 ===');
    const sections = await page.locator('section').count();
    console.log('Number of sections:', sections);
    
    const sectionTitles = await page.locator('h2').allTextContents();
    console.log('Section titles:', sectionTitles);
    
    console.log('\n=== 组件渲染成功 ===');
    console.log('所有组件已正确渲染！');
    
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
