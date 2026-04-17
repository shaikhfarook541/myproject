import { Page } from '@playwright/test';

export class MyntraPage {
  readonly page: Page;
  readonly MYNTRA_URL = 'https://www.myntra.com/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToMyntra() {
    await this.page.goto(this.MYNTRA_URL, { waitUntil: 'domcontentloaded' });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}
   