import { initializeApp, FirebaseApp } from 'firebase/app';
import {
    getAuth as getFirebaseAuth,
    GoogleAuthProvider,
    signInWithPopup,
    Auth,
} from 'firebase/auth';
import {
    getStorage as getFirebaseStorage,
    FirebaseStorage,
} from 'firebase/storage';
import {
    getFirestore as getFirebaseFirestore,
    Firestore,
} from 'firebase/firestore';

const firebaseConfig = {};

let app: FirebaseApp;
let provider: GoogleAuthProvider;
let auth: Auth;
let firestore: Firestore;
let storage: FirebaseStorage;

const initializeFirebaseApp = () => {
    if (!app) {
        app = initializeApp(firebaseConfig);
        console.log('Firebase app initialized');
    }
    return app;
};

// const analytics = getAnalytics(app);

const getProvider = () => {
    if (!provider) {
        provider = new GoogleAuthProvider();
    }
    return provider;
};

export const getAuth = () => {
    if (!auth) {
        auth = getFirebaseAuth();
        console.log('Firebase auth initialized');
    }
    return auth;
};

export const getFirestore = () => {
    if (!firestore) {
        const app = initializeFirebaseApp();
        firestore = getFirebaseFirestore(app);
        console.log('Firebase storage initialized');
    }
    return firestore;
};

export const getStorage = () => {
    if (!storage) {
        const app = initializeFirebaseApp();
        storage = getFirebaseStorage(app);
        console.log('Firebase firestore initialized');
    }
    return storage;
};

export const signInWithGoogle = () => {
    try {
        signInWithPopup(getAuth(), getProvider());
    } catch (error) {
        console.log('error sign in', error);
    }
};
