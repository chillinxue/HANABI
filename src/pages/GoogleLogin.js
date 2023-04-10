import React from 'react';
import useFirebase from '../components/utils/hook/firebase';
import userGoogle from '../components/utils/hook/google';

export default function GoogleLogin() {
    useFirebase();
    const { handleLoginGoogle } = userGoogle();

    return <button onClick={handleLoginGoogle}>使用google登入</button>;
}
