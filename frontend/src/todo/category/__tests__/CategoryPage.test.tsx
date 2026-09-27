import {render, screen, within} from '@testing-library/react';
import {expect} from 'vitest';
import {CategoryPage} from '../CategoryPage.tsx';
import * as categoryApi from '../CategoryService.ts';

vi.mock('../CategoryService.ts');

const mockData = [
    {id: 1, label: 'Active'},
    {id: 2, label: 'Closed'},
];

describe('Category Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(categoryApi.getAllCategories).mockResolvedValue(mockData);
    });

    it('should display category page heading', async () => {
        render(<CategoryPage/>);
        await screen.findByRole('list');

        expect(
            screen.getByRole('heading', {name: /Categories/i}),
        ).toBeInTheDocument();
    });

    it('should show multiple categories', async () => {
        render(<CategoryPage/>);

        // Wait for async data to render
        const list = await screen.findByRole('list');

        const items = within(list).getAllByRole('listitem');

        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Active');
        expect(items[1]).toHaveTextContent('Closed');
    });

    it('should show multiple categories and find the first category', async () => {
        render(<CategoryPage/>);

        // Wait for async data to render
        const list = await screen.findByRole('list');

        const items = within(list).getAllByRole('listitem');

        expect(items).toHaveLength(2);

        const firstItem = await within(list).findByText('Active');
        expect(firstItem).toBeInTheDocument();
    });
});

describe('Empty Category Page', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(categoryApi.getAllCategories).mockResolvedValue([]);
    });

    it('should display no categories found for empty data', async () => {
        render(<CategoryPage/>);

        await expect(screen.findByText('No Categories Found'));
    });
});
