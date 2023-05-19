import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../components/utils/firebase/firbase';
import { DocumentData } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

// export interface User {
//     name: string;
//     email: string;
//     userUID: string;
// }

// interface AuthContextType {
//     isLogin: boolean;
//     user: User;
//     loading: boolean;
//     userUID: string;
//     signIn: (auth: Auth, provider: GoogleAuthProvider) => Promise<void>;
//     logOut: (auth: Auth) => Promise<void>;
// }

export const AuthContext = createContext({
    isLogin: false,
    user: {
        name: '',
        email: '',
        userUID: '',
        userImage: '',
    },
    loading: false,
    userUID: '',
    signIn: async () => {},
    logOut: async () => {},
});
const initialUserData = {
    name: '',
    email: '',
    userUID: '',
    userImage: '',
};
export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(initialUserData);
    const [loading, setLoading] = useState(true);
    const [userUID, setUserUID] = useState('');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    async function getUsers(userUID) {
        const docRef = doc(db, 'users', userUID);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                const getUser = await getUsers(user.uid);
                setUserUID(user.uid);
                if (getUser) {
                    setIsLogin(true);
                    console.log('有');

                    const data = {
                        name: getUser.name || user.displayName || '',
                        email: getUser.email || user.email || '',
                        userUID: getUser.userUID || user.userUID || '',
                        userImage: getUser.photoURL || user.photoURL || '',
                    };
                    setUser(data);
                    setUserUID(user.uid);
                } else {
                    console.log('沒有');
                    setIsLogin(true);
                    const data = {
                        name: user.displayName || '',
                        email: user.email || '',
                        userUID: user.uid || '',
                        userImage: user.photoURL || '',
                    };
                    setUser(data);
                }
            } else {
                setIsLogin(false);
                console.log('登出');
            }
        });
    }, []);

    async function setUserDoc(data) {
        const docRef = doc(db, 'users', `${data.userUID}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('帳戶已存在');
            return;
        } else {
            console.log('帳戶不存在');
            const userRef = collection(db, 'users');
            await setDoc(doc(userRef, data.userUID), data);
        }
    }

    const signIn = async (auth, provider) => {
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        const data = {
            name: user.displayName || '',
            email: user.email || '',
            userUID: user.uid || '',
            userImage: user.photoURL || '',
        };
        await setUserDoc(data);
        setUser(data);
        setUserUID(data.userUID);
        setIsLogin(true);
        navigate(pathname, { replace: true });
    };

    const logOut = async (auth) => {
        setLoading(false);
        await signOut(auth);
        setUser(initialUserData);
        setUserUID('');
        setIsLogin(false);
        setLoading(false);
        navigate(`/`, { replace: true });
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                user,
                loading,
                userUID,
                signIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
