import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, expect } from 'vitest';
import {getAllCategories} from '../CategoryService.ts';
import type { Category } from '../CategoryType.ts';

describe('Category Service', () => {
    //axios.defaults.baseURL = "http://localhost:8080";

    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should get all categories', async () => {
        const expected: Category[] = [
            {id: 1, label: 'active'},
            {id: 2, label: 'closed'},
        ];

        server.use(
            http.get('/api/v1/category', () =>
                HttpResponse.json(expected, {status: 200}),
            ),
        );

        expect(await getAllCategories()).toStrictEqual(expected);
    });

    it('should save a new category', async () => {
        const newCategory: Category = {label: 'new category'} as Category;

        server.use(
            http.post('/api/v1/category', () =>
            HttpResponse.json(newCategory, {status: 200}),),
        );
    });
});