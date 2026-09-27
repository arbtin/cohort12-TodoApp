import {Route, Routes} from 'react-router-dom';
import ReactVite from '../ReactVite.tsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ReactVite/>}/>
        </Routes>
    );
}
