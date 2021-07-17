import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "context/Auth";
import { db } from "utils/Firebase";
import { useAuth } from "context/useAuth";
import Router from "next/router";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { currentUser } = useAuth();
  //非登録=>addUserリンクへ
  if (currentUser) {
    let isAddedUser: boolean;
    db.collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.data() && (isAddedUser = true);
        });
        if (isAddedUser) {
          console.log("ok");
        } else {
          Router.push("/addUser");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //ログインしていない場合はログインページへ
  useEffect(() => {
    !currentUser && Router.push("/signIn");
  }, [currentUser]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
