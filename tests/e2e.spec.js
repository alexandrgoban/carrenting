import { test, expect } from '@playwright/test';

import { randomCity } from "../data/testData";

import { CarRentalPage } from '../pages/CarRentalPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { StayPage } from '../pages/StayPage';

test.describe('Car Rental Search & Deal Navigation', () => {
    test('should search for car rentals in New York', async ({ page }) => {
        const carRentalPage = new CarRentalPage(page);
        const searchResultsPage = new SearchResultsPage(page);
        const stayPage = new StayPage(page);
        let dealPage

        await test.step('Open Booking page' , async () => {
            await stayPage.gotoBooking();
        })
        await test.step('Close cookie banner' , async () => {
            await stayPage.handleCookieBanner();
        })
        await test.step('Close Sing In view' , async () => {
            await stayPage.closeSignInView();
        })
        await test.step('Open Car Rental page' , async () => {
            await stayPage.openCarRentalPage();
        })
        await test.step('Verify redirection to the car rental page' , async () => {
            await expect(page).toHaveURL(/.*cars\/index/);
        })
        await test.step('Enter New Your and click Search' , async () => {
            await carRentalPage.setPickupLocation(randomCity);
            await carRentalPage.clickSearch();
        })
        await test.step('Close the Sing in View' , async () => {
            await searchResultsPage.closeSingInView();
        })
        await test.step('Very that link, text in the search, the car card presents and  cars label presents' , async () => {
            await searchResultsPage.veryResultHeader();

            await expect(page).toHaveURL(/.*cars\.booking\.com\/search-results/);

            await expect(searchResultsPage.searchInput).toHaveValue(randomCity);

            await searchResultsPage.veryResultHeader();
        })
        await test.step('Go to a new tab of Deal page' , async () => {
            dealPage = await searchResultsPage.goDealPage();
        })
        await test.step('Verify redirection to the Deal page' , async () => {
            await expect(dealPage).toHaveURL(/.*cars\.booking\.com\/package\/deal/);
        })

    });
});