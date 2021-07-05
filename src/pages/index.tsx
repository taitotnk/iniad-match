// import Link from "next/link";
import Layout from "components/layout";
import { Login, Logout, auth } from "lib/firebase";
import { FC } from "react";
import Image from "next/image";

const IndexPage: FC = () => (
  <Layout title="index">
    <h1>INIAD-MATCH 👋</h1>
    <div>
      {auth.currentUser && (
        <div>
          <Image
            src={auth.currentUser.photoURL}
            quality={100}
            width={200}
            height={200}
            alt="profile img"
          />
          <h2 className="text-6xl">
            {auth.currentUser.displayName}さん こんにちは！
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => Logout()}
          >
            ログアウト
          </button>
        </div>
      )}
      {!auth.currentUser && (
        <div>
          <h2>INIADアカウントでログインしてください</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => Login()}
          >
            ログイン
          </button>
        </div>
      )}
    </div>
  </Layout>
);

export default IndexPage;
