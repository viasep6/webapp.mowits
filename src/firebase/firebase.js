import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCLaDVJn8lDlDutJyfNloRFvC5PNNQPVHU',
    authDomain: 'mowits-5ddc5.firebaseapp.com',
    projectId: 'mowits-5ddc5',
    storageBucket: 'mowits-5ddc5.appspot.com',
    messagingSenderId: '271837571883',
    appId: '1:271837571883:web:554d126b5ddc4e06dcf36e',
    measurementId: 'G-4WYX4RB2RF',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


const loginWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};
// const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//         const res = await auth.createUserWithEmailAndPassword(email, password);
//         const user = res.user;
//         await db.collection('users').add({
//             uid: user.uid,
//             name,
//             authProvider: 'local',
//             email,
//         });
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const sendPasswordResetEmail = async (email) => {
//     try {
//         await auth.sendPasswordResetEmail(email);
//         alert('Password reset link sent!');
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

export {
    loginWithEmailAndPassword,
    // registerWithEmailAndPassword,
    // sendPasswordResetEmail,
};