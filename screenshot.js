const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    channel: 'chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'playground-screenshot.png', fullPage: true });
    console.log('Screenshot saved to playground-screenshot.png');
    
    // 获取页面标题
    const title = await page.title();
    console.log('Page title:', title);
    
    // 检查是否有按钮组件
    const buttons = await page.locator('button').count();
    console.log('Number of buttons found:', buttons);
    
    // 获取按钮文本
    const buttonTexts = await page.locator('button').allTextContents();
    console.log('Button texts:', buttonTexts);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
