import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const useGoogle = () => {
    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                console.log(user);
                // 在這邊把user資料寫入locaStorage或是進行後端寫入資料庫等等的操作
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return { handleLoginGoogle };
};
export default useGoogle;
