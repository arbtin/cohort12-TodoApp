import {useEffect, useState} from 'react';
import {getAllCategories} from "./CategoryService.ts";
import type {Category} from "./CategoryType.ts";
import {CategoryItem} from "./CategoryItem.tsx";
import {CategoryForm} from "./CategoryForm.tsx";

export const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const refreshData = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <h2 className={'font-extrabold'}>Categories</h2>
            <ul id={"list"} className={'grid grid-cols-3 gap-4'}>
                {categories.length > 0 ? (
                    categories.map((category) => <CategoryItem key={category.id} initialCategory={category}/>)
                ) : (
                    <li>No Categories found.</li>
                )}
            </ul>
            <CategoryForm onSuccess={refreshData}/>
        </>
    );
};
