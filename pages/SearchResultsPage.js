import { expect } from '@playwright/test';

export class SearchResultsPage {

  constructor(page) {
    this.page = page;
    this.resultsHeader = page.getByRole('heading', { name: /cars available/i });
    this.searchInput = this.page.locator('.SearchBoxFieldAutocomplete_input');
    this.singInCloseButton = page.locator('[data-testid="signin-modal-close"]');
    this.viewDealButton = page.locator('button[aria-label="View deal"]');
  }
  async closeSingInView() {
    try {
      const closeBtn = this.singInCloseButton;
      await closeBtn.waitFor({ state: 'visible', timeout: 7000 });
      await closeBtn.click({ force: true });
      console.log('Genius modal closed.');
    } catch (error) {
      console.log('Windows is not caught');
    }
  }
  async veryResultHeader(cityName) {
    await this.resultsHeader.waitFor({ state: 'visible', timeout: 70 * 1000 });
    await expect(this.resultsHeader).toContainText(/cars available/i);
  }

  async goDealPage() {
    const pagePromise = this.page.context().waitForEvent('page');
    await this.viewDealButton.first().click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }
}
