import type {Category} from "../category/CategoryType.ts";

export type Task = {
  id?: number;
  title: string;
  description: string;
  category: Category;
};
