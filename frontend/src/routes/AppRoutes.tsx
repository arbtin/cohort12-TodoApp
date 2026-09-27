import {Route, Routes} from 'react-router-dom';
import ReactVite from '../ReactVite.tsx';
import {TaskPage} from "../todo/task/TaskPage.tsx";
import {CategoryPage} from "../todo/category/CategoryPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ReactVite/>}/>
            <Route path="/tasks" element={<TaskPage/>}/>
            <Route path="/categories" element={<CategoryPage/>}/>
        </Routes>
    );
}
