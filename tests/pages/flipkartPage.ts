import { Page } from '@playwright/test';

export class FlipkartPage {
  readonly page: Page;
  readonly FLIPKART_URL = 'https://www.flipkart.com/';
  readonly searchofProduct;
  readonly closeButton;
  readonly mobileLink;
  readonly cartLink;

  constructor(page: Page) {
    this.page = page;
    this.closeButton = page.getByRole('button', { name: '✕' });
    this.searchofProduct = page.getByRole('textbox', { name: 'Search for Products, Brands' });
    this.mobileLink = page.locator("(//div[@class='RG5Slk'])[last()]");
    this.cartLink = page.getByRole('link', { name: 'Cart 1 Cart' });
  }

  async navigateToFlipkart() {
    await this.page.goto(this.FLIPKART_URL, { waitUntil: 'domcontentloaded' });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  async closePopup() {
    await this.closeButton.click();
  }

  async clickSearchProduct() {
    await this.searchofProduct.click();
  }

  async searchProduct(productName: string) {
    await this.searchofProduct.fill(productName);
    await this.searchofProduct.press('Enter');
  }

  async clickMobileLink() {
    await this.mobileLink.click();
  }

  async clickProductAndOpenPopup(productName: string) {
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: productName }).click();
    const page1 = await page1Promise;
    return page1;
  }

  async clickCart(page1: Page) {
    const cartLink = page1.getByRole('link', { name: 'Cart 1 Cart' });
    await cartLink.click();
  }

  async addProductToCart(productName: string) {
    const page1 = await this.clickProductAndOpenPopup(productName);
    await this.clickCart(page1);
  }
}
