import Layout from "components/layout";
import { FC, useEffect, useContext } from "react";
import Router from "next/router";
import { useAuth } from "context/useAuth";
import logout from "lib/logout";
import Image from "next/image";
import { auth, db } from "utils/Firebase";
import isAddedUser from "lib/isAddedUser";
import getMatchData from "lib/getMatchData";
import { GetServerSideProps } from "next";
import { AuthContext } from "context/Auth";

type UserData = {
  name: string;
  email: string;
  photoURL: string;
  favorite: string;
  twitterId: string;
  instagramId: string;
  // lineId: string;
  description: string;
}[];

type UserDataProps = {
  userData: UserData;
};

const Home = ({ userData }: UserDataProps) => {
  const { currentUser } = useAuth();
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

        {userData.map((data) => (
          <>
            <div className="bg-white rounded px-4 py-4 flex flex-col justify-between leading-normal shadow">
              <div className="flex mt-3">
                <Image
                  src={data.photoURL}
                  width={60}
                  height={60}
                  alt="prof_img"
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-700 text-2xl capitalize">
                    {" "}
                    {data.name}{" "}
                  </p>
                </div>
              </div>
              <div>
                <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">
                  {data.description}
                </div>
                <a href={`https://twitter.com/${data.twitterId}`}>
                  <button>Twitter</button>
                </a>
                <div>
                  <a href={`https://www.instagram.com/${data.instagramId}`}>
                    <button>Instagram</button>
                  </a>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userData: UserData = [];
  const ref = await db.collection("users").get();
  ref.docs.map((doc) => {
    const data = {
      name: doc.data().name,
      email: doc.data().email,
      photoURL: doc.data().photoURL,
      favorite: doc.data().favorite,
      twitterId: doc.data().twitterId,
      instagramId: doc.data().instagramId,
      // lineId: doc.data().lineId,
      description: doc.data().description,
    };
    userData.push(data);
  });

  return {
    props: { userData: JSON.parse(JSON.stringify(userData)) },
  };
};
export default Home;
