import { test, expect } from '@playwright/test';
import { FlipkartPage } from './pages/flipkartPage';

test.setTimeout(60000); // Increase timeout to 60 seconds

test('Navigate to Flipkart homepage', async ({ page, context }) => {
  const flipkartPage = new FlipkartPage(page);

  await flipkartPage.navigateToFlipkart();
  await expect(page).toHaveURL(/flipkart\.com/);

  await flipkartPage.searchofProduct.waitFor({ state: 'visible', timeout: 10000 });
  await flipkartPage.searchProduct('mobiles');

  // Wait for new tab to open when clicking mobile link
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),   // Listen for new page
    flipkartPage.clickMobileLink()  // Action that triggers new tab
  ]);

  // Ensure the new page is loaded
  await newPage.waitForLoadState();

  // Now click the "Buy now" button in the new tab
  const buyNowButton = newPage.locator("//div[@dir='auto' and normalize-space()='Buy now']");
  await buyNowButton.waitFor({ state: 'visible', timeout: 10000 });
  await buyNowButton.click();

  await page.waitForTimeout(5000); // Wait for 5 seconds to observe the result
});
