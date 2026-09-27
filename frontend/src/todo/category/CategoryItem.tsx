import type {Category} from "../category/CategoryType.ts";

type CategoryItemProps = {
    initialCategory: Category;
};

export const CategoryItem = ({ initialCategory }: CategoryItemProps) => {
    return (
        <li
            className="p-1 card"
            aria-label={`Category ${initialCategory.id}`}
            id={initialCategory.id}
        >
            <b>{initialCategory.label}</b>
        </li>
    );
};