import { signInWithGoogle } from '../../firebase.ts';

export const Login = () => {
    return (
        <div className="dashboard">
            <button onClick={signInWithGoogle}>Sign in with google</button>
        </div>
    );
};
