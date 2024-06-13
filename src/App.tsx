import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/layout.tsx';
import { Home } from './components/Home/home.tsx';
import { About } from './components/About/about.tsx';
import { Contact } from './components/Contact/contact.tsx';
import { Portfolio } from './components/Portfolio/portfolio.tsx';
// import {Dashboard} from "./components/Dashboard/dashboard.tsx";

function App() {
    console.log(import.meta.env);
    console.log(import.meta.env.MODE);
    console.log(import.meta.env.API_KEY);
    console.log(import.meta.env.API_KEY);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                </Route>
            </Routes>
        </>
    );
}

export default App;
