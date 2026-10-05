<<<<<<< HEAD
import type {Category} from "../category/CategoryType.ts";

export type Task = {
  id?: number;
  title: string;
  description: string;
  category: Category;
};
=======
export type Task = {
    id?: number;
    title: string;
    description: string;
    isComplete: boolean;
}
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
