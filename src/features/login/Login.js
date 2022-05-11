import * as React from "react";
import { useAuth } from "../../useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../app/firebase";

export const LoginPage = () => {
  const { login } = useAuth();

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authentication, provider)
      .then((res) => {
        console.log(res);
        if (res.user.email !== "testaswebsite@gmail.com") {
          login(res.user);
        }
      })
      .catch((er) => console.log(er));
  };

  return <button onClick={() => signIn()}>Sing In</button>;
};
