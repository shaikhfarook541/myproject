import { test, expect } from '@playwright/test';
import { AmazonPage } from './pages/amazonPage';

test.setTimeout(60000); // Increase timeout to 60 seconds

test('Navigate to Amazon homepage', async ({ page }) => {
  const amazonPage = new AmazonPage(page);

  await amazonPage.navigateToAmazon();
  await expect(page).toHaveURL(/amazon\.in/);
  await expect(page).toHaveTitle(/Amazon/i);

  await amazonPage.searchBox.waitFor({ state: 'visible', timeout: 10000 });
  await amazonPage.searchAndFilter('mobiles');
  await page.waitForTimeout(5000); 
  await amazonPage.clickCart();
  await page.waitForTimeout(5000); 
  await amazonPage.trashCart(); 
  await page.waitForTimeout(2000); 
  await amazonPage.amazonHome();
  await page.waitForTimeout(2000);
});
