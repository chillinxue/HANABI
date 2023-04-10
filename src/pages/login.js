// import React, { useEffect, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
// import styled from 'styled-components';
// import { log } from 'console';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const Container = styled.div``;
// const LoginButton = styled.button``;
// const UserInfo = styled.div``;
// const LogoutButton = styled.button``;
// const Title = styled.div``;

// const db = firebase.firestore();

// export default function Login() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();

//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     const handleLoginGoogle = async () => {
//         const provider = new GoogleAuthProvider();
//         const auth = getAuth();
//         signInWithPopup(auth, provider)
//             .then(async (result) => {
//                 setUser(result.user);

//                 if (result.user) {
//                     const userDocRef = db.collection('users').doc();

//                     await userDocRef.set({
//                         displayName: result.user.displayName,
//                         email: result.user.email,
//                         photoURL: result.user.photoURL,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };

//     const handleLogout = () => {
//         const auth = getAuth();
//         signOut(auth)
//             .then(() => {
//                 setUser(null);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     console.log('user', user);

//     return (
//         <Container>
//             {user ? (
//                 <UserInfo>
//                     <p>歡迎, {user.displayName}！</p>
//                     <LogoutButton onClick={handleLogout}>登出</LogoutButton>
//                 </UserInfo>
//             ) : (
//                 <>
//                     <Title>會員登入</Title>
//                     <LoginButton onClick={handleLoginGoogle}>使用 Google 登入</LoginButton>
//                 </>
//             )}
//         </Container>
//     );
// }
