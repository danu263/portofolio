import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Loader from 'react-loaders';
import { AnimatedLetters } from '../AnimatedLetters/animatedLetters.tsx';
import { Logo } from './logo.tsx';
import './home.scss';

export const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const nameArray = ['a', 'l', 'e', 'x', ' ', 'm', '.'];
    const jobArray = [
        'w',
        'e',
        'b',
        ' ',
        'd',
        'e',
        'v',
        'e',
        'l',
        'o',
        'p',
        'e',
        'r',
        '.',
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                        <br />
                        <span className={`${letterClass} _13`}>I</span>
                        <span className={`${letterClass} _14`}>'m</span>
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={nameArray}
                            idx={15}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray}
                            idx={22}
                        />
                    </h1>
                    <h2>Full-stack Developer / Java Expert / Lima, Peru</h2>
                    {/*<Link to="/contact" className="flat-button">*/}
                    {/*    CONTACT ME*/}
                    {/*</Link>*/}
                </div>
                <Logo />
            </div>

            <Loader type="pacman" active={true} />
        </>
    );
};
