export class CarRentalPage {
  constructor(page) {
    this.page = page;
    this.pickUpLocationInput = page.getByRole('combobox', { name: /pick-up location/i });
    this.searchButton = page.getByRole('button', { name: 'Search' });

  }
  async setPickupLocation(location) {
    await this.pickUpLocationInput.click();
    await this.pickUpLocationInput.clear();
    await this.pickUpLocationInput.pressSequentially(location, { delay: 200 });
    const firstOption = this.page.getByRole('option').first();
    await firstOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstOption.click();
  }
  async clickSearch() {
    await this.searchButton.click();
  }
}
