import { test, expect } from '@playwright/test';
import {apiDataPost} from "../data/testData";

test.describe('RESTful API Objects Tests', () => {
    test.describe.configure({ mode: 'serial' });
    let createdObjectId ;

    test('GET - List all objects', async ({request}) => {
        const response = await request.get('');
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });
    test('POST - Create a new object', async ({request}) => {
        const response = await request.post('', {
            data: apiDataPost
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.name).toBe(apiDataPost.name);

        createdObjectId = body.id;
        console.log('Created object ID:', createdObjectId);
        console.log(body);
    });

    test('GET - Get single object by ID', async ({request}) => {
        test.skip(!createdObjectId, 'Created object ID is not available');
        const response = await request.get(`/${createdObjectId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBe(createdObjectId);
        expect(body.name).toBe(apiDataPost.name);
    });

    test('DELETE - Remove the created object', async ({request}) => {
        test.skip(!createdObjectId, 'Created object ID is not available');

        const response = await request.delete(`/${createdObjectId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toContain('has been deleted');
        console.log('Delete response:', body.message);
    });
});
