import {BrowserRouter} from 'react-router-dom';
import './App.css';
import AppRoutes from "./routes/AppRoutes.tsx";
import Navbar from "./components/Navbar.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRoutes/>
        </BrowserRouter>
    );
}