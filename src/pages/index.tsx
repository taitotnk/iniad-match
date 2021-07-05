// import Link from "next/link";
// import Layout from "../components/Layout";
import { Login, Logout, auth } from "lib/firebase";
import { FC } from "react";

const IndexPage: FC = () => (
  <>
    <h1>Hello Next.js 👋</h1>
    <div>
      {auth.currentUser && (
        <div>
          <h2>{auth.currentUser.displayName}さん こんにちは！</h2>
          <button onClick={() => Logout()}>ログアウト</button>
        </div>
      )}
      {!auth.currentUser && (
        <div>
          <h2>INIADアカウントでログインしてください</h2>
          <button onClick={() => Login()}>ログイン</button>
        </div>
      )}
    </div>
  </>
);

export default IndexPage;
