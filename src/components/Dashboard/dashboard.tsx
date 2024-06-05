import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Login } from './login.tsx';
import { Logged } from './logged.tsx';

export const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return <div>{user ? <Logged /> : <Login />}</div>;
};
