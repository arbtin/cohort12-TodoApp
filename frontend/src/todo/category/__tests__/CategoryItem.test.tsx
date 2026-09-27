import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import type {Category} from "../CategoryType.ts";
import {CategoryItem} from "../CategoryItem.tsx";

describe('Category Item', () => {
    it('should display single category item', () => {
        const cateogory1: Category = {
            id: 1,
            label: 'Closed',
        };
        // Arrange
        render(<CategoryItem initialCategory={cateogory1} />);

        expect(screen.getByRole('listitem', { name: /category/i })).toBeInTheDocument();
        expect(
            screen.getByText('Closed', { exact: false }),
        ).toBeInTheDocument();
    });
});