import { initializeApp } from 'firebase/app';
import FirebaseConfig from '../assets/serviceAccountKey.json';
const useFirebase = () => {
    initializeApp(FirebaseConfig);
};
export default useFirebase;
