import { FC, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "context/useAuth";
import login from "lib/login";

const SignIn: FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    currentUser && Router.push("/");
  }, [currentUser]);

  return (
    <div className="container mx-auto">
      <h1 className="text-white">INIAD-MATCH👋</h1>
      <h2 className="text-white">INIAD生のためのマッチングアプリ</h2>
      <div className="w-full flex justify-center">
        <div className="flex flex-col md:w-3/5 p-3 space-y-5 rounded-xl border border-black bg-white shadow-md">
          <section className="text-3xl font-bold">気軽にSNSで繋がる</section>
          <section className="font-normal text-md text-gray-700">
            Twitter IDやInstagram
            IDを設定することで、INIAD生の間でSNSでつながることができる！
            <br />
            趣味を公開することで共通の話題でMATCHできる！
            <br />
            INIADアカウントでのみログイン可能だから安心安全！
          </section>
          <button
            className="animate-pulse bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={login}
          >
            INIADアカウントでログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
