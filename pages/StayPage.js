export class StayPage {
    constructor(page) {
        this.page = page;
        this.acceptButton = page.locator('[id="onetrust-accept-btn-handler"]');
        this.dismissButton = page.getByLabel('Dismiss sign-in info.');
        this.carRentalButton = page.locator('[id="cars"]');
    }

    async gotoBooking() {
        await this.page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        });
        await this.page.goto('/');

    }
    async handleCookieBanner() {
        await this.acceptButton.click();
    }
    async closeSignInView() {
        if (await this.dismissButton.isVisible()) {
            await this.dismissButton.click();
        }
    }
    async openCarRentalPage() {
        await this.carRentalButton.click();
    }
}