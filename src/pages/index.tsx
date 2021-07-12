import Layout from "components/layout";
import { FC, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "context/useAuth";
import logout from "lib/logout";
import Image from "next/image";
import { auth, db } from "utils/Firebase";
import { GetServerSideProps } from "next";
import { elastic as Menu } from "react-burger-menu";
import Link from "next/link";

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

const Home: FC = ({ userData }: UserDataProps) => {
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
      <Menu width={250}>
        <div className="side_img">
          <div>
            {userData.map((data) => (
              <>
                {data.email == currentUser?.email && (
                  <div>
                    <Image
                      className="inline-block rounded-full h-24 w-24 flex items-center justify-center"
                      src={data.photoURL}
                      width={200}
                      height={200}
                      quality={90}
                      alt="profile_img"
                    />
                    <h2>{data.name}</h2>
                    <h3>{data.favorite}</h3>
                    <div>
                      <a href={`https://twitter.com/${data.twitterId}`}>
                        <button className="my-6 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                          Twitter
                        </button>
                      </a>
                    </div>
                    <div>
                      {data.instagramId !== "" && (
                        <a
                          href={`https://www.instagram.com/${data.instagramId}`}
                        >
                          <button className="py-2 px-4 rounded-full text-white font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-200 hover:from-pink-500 hover:to-orange-500">
                            Instagram
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
            <div>
              <button
                className="my-6 bg-red-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
                onClick={logout}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </Menu>

      <div className="container mx-auto">
        <Link href="/">
          <a>
            <h1 className="text-white">INIAD-MATCH 👋</h1>
          </a>
        </Link>

        {userData.map((data) => (
          <>
            {data.email != currentUser?.email && (
              <div className="container mx-auto md:w-3/5 my-8 bg-white rounded px-4 py-4 flex flex-col justify-between leading-normal shadow">
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
                    <h2>Like💖 {data.favorite}</h2>
                  </div>
                  <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">
                    {data.description}
                  </div>
                  <a href={`https://twitter.com/${data.twitterId}`}>
                    <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Twitter
                    </button>
                  </a>
                  {data.instagramId !== "" && (
                    <a href={`https://www.instagram.com/${data.instagramId}`}>
                      <button className="py-2 px-4 rounded-full text-white font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-200 hover:from-pink-500 hover:to-orange-500">
                        Instagram
                      </button>
                    </a>
                  )}
                </div>
              </div>
            )}
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
