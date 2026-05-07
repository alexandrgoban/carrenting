import { faker } from '@faker-js/faker';

const cities = ['New York', 'Lviv', 'Kyiv'];
export const randomCity = cities[Math.floor(Math.random() * cities.length)];

// export const cardData = {
//     cardNumber: '1234567891234567',
//     cardDate: '01/28',
//     cardCVV: faker.finance.creditCardCVV(),
//
// }

export const apiDataPost = {
        name: 'Apple MacBook Pro 16',
        data: {
            year: 2019,
            price: 1849.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '1 TB'
        }
}

export const apiDataPatch = {
    title: 'Hello AQA',
}