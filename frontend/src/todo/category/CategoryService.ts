import type {Category} from "../category/CategoryType.ts";
import axios, {type AxiosResponse} from "axios";

type GetCategories = () => Promise<Category[]>;
type SaveCategory = (category: Category) => Promise<Category>;

export const getAllCategories: GetCategories = async () =>
    axios
        .get('/api/v1/category')
        .then((r: AxiosResponse<Category[]>) => r.data)
        .catch();

export const saveCategory: SaveCategory = (category: Category) => (axios
    .post('/api/v1/category', category)
    .then((r: AxiosResponse<Category>) => r.data)
    .catch());
