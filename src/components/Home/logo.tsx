import { useEffect } from 'react';
import Alex from '../../assets/images/alex.png';
import './logo.scss';

export const Logo = () => {
    useEffect(() => {}, []);

    return (
        <div className="logo-container">
            <img
                className="solid-logo"
                src={Alex}
                alt="JavaScript,  Developer"
            />
        </div>
    );
};
