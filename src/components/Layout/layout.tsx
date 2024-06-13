import { Sidebar } from '../Sidebar/sidebar.tsx';
import { Outlet } from 'react-router-dom';
import './layout.scss';

export const Layout = () => {
    return (
        <div className="App">
            <Sidebar />
            <div className="page">
                <Outlet />
            </div>
        </div>
    );
};
