import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/layout.tsx';
import { Home } from './components/Home/home.tsx';
import { About } from './components/About/about.tsx';
import { Contact } from './components/Contact/contact.tsx';
import { Portfolio } from './components/Portfolio/portfolio.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
