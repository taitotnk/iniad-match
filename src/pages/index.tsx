import Layout from "components/layout";
import { FC, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "context/useAuth";
import logout from "lib/logout";
import Image from "next/image";
import { auth, db } from "utils/Firebase";
import isAddedUser from "lib/isAddedUser";

const Home: FC = () => {
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

  useEffect(() => {
    !currentUser && Router.push("/signIn");
  }, [currentUser]);

  return (
    <Layout title="index">
      <div className="container mx-auto">
        <h1>INIAD-MATCH 👋</h1>
        {currentUser && (
          <div>
            <div className="absolute top-0 right-0 h-20 w-20">
              <Image
                className="rounded-full h-24 w-24 flex items-center justify-center"
                src={currentUser?.photoURL}
                width={100}
                height={100}
                quality={90}
                // layout={"responsive"}
                alt="profile_img"
              />
            </div>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={logout}
        >
          logout
        </button>
      </div>
    </Layout>
  );
};

export default Home;
