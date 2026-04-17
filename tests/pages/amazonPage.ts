import { Locator, Page } from '@playwright/test';

export class AmazonPage {
    readonly page: Page;
    readonly AMAZON_URL = 'https://www.amazon.in/ref=nav_logo';
    readonly searchofProduct;
    readonly searchBox;
    readonly filterButton;
    readonly cart;
    readonly trash;
    readonly amazon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchofProduct = page.locator("//input[@id='twotabsearchtextbox']");
        this.searchBox = page.getByRole('searchbox', { name: 'Search Amazon.in' });
        this.filterButton = page.locator('#a-autoid-27-announce');
        this.cart = page.getByRole('link', { name: 'item in cart' });
        this.trash=page.locator("//span[@class='a-icon a-icon-small-trash'] ")
        this.amazon=page.locator("//a[@id='nav-logo-sprites']");
    }

    async navigateToAmazon() {
        await this.page.goto(this.AMAZON_URL, { waitUntil: 'domcontentloaded' });
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }

    async clickSearchBox() {
        await this.searchBox.click();
    }

    async searchProduct(productName: string) {
        await this.searchBox.fill(productName);
        await this.searchBox.press('Enter');
    }

    async clickFilter() {
        await this.filterButton.click();
    }

    async searchAndFilter(productName: string) {
        await this.clickSearchBox();
        await this.searchProduct(productName);
        await this.clickSearchBox();
        await this.searchBox.press('Enter');
        await this.clickFilter();
    }
    async clickCart() {
        await this.cart.click();
    }
    async trashCart() {
        await this.trash.click();
    }
    async amazonHome() {
        await this.amazon.click();
    }
}
