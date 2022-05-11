import * as React from "react";
import { useAuth } from "../../useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../app/firebase";
import "./Login.css";
export const LoginPage = () => {
  const { login } = useAuth();
  const allowList = ["aivaraskursevicius@gmail.com", "guoda0831@gmail.com"];
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authentication, provider)
      .then((res) => {
        if (allowList.includes(res.user.email)) {
          login(res.user);
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="login-pg">
      <button className="login-with-google-btn" onClick={() => signIn()}>
        Sign in with Google
      </button>
    </div>
  );
};
