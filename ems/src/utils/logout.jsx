import { getAuth, signOut } from "firebase/auth";

const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log(auth)
    }).catch((error) => {
      console.log(error)
    });
}

export default logout