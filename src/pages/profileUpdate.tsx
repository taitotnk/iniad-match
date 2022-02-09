import { UserData } from ".";
import { GetServerSideProps } from "next";
import { db } from "utils/Firebase";
import { useAuth } from "context/useAuth";
import Router from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { getMyInfo } from "lib/getMyInfo";
import { useEffect, useState } from "react";

type FormState = {
  favorite: string;
  twitterId: string;
  instagramId: string;
  description: string;
};

type MyInfo = FormState & {
  email: string;
  photoURL: string;
  name: string;
};

const ProfileUpdate = () => {
  const { currentUser } = useAuth();

  // 現在のプロフィール情報を取得
  const [myInfo, setMyInfo] = useState<MyInfo>();
  useEffect(() => {
    const userDataRaw = getMyInfo(currentUser?.email);
    userDataRaw.then((result) => {
      if (result) {
        const MyInfoRaw = {
          favorite: result[0]?.favorite,
          twitterId: result[0]?.twitterId,
          instagramId: result[0]?.instagramId,
          description: result[0]?.description,
          email: result[0]?.email,
          photoURL: result[0]?.photoURL,
          name: result[0]?.name,
        };
        setMyInfo(MyInfoRaw);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    mode: "onSubmit",
    defaultValues: {
      favorite: "",
      twitterId: "",
      instagramId: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const userData = {
      email: currentUser?.email,
      name: currentUser?.displayName,
      photoURL: currentUser?.photoURL,
      favorite: data.favorite,
      twitterId: data.twitterId,
      instagramId: data.instagramId,
      description: data.description,
    };

    if (window.confirm("更新しますか？"))
      if (currentUser?.email) {
        db.collection("users")
          .doc(currentUser?.email)
          .update(userData)
          .then(() => {
            Router.push("/");
          })
          .catch((error) => {
            console.log(error);
            alert("登録に失敗しました");
          });
      }
  });

  return (
    <div className="container mx-auto">
      {currentUser && (
        <div>
          <h1 className="text-white">プロフィールの編集</h1>
          {currentUser.photoURL !== null && (
            <Image
              className="rounded-full h-24 w-24 flex items-center justify-center"
              src={currentUser.photoURL}
              width={100}
              height={100}
              quality={90}
              alt="profile_img"
            />
          )}
          <h2 className="text-white">{currentUser.displayName}</h2>

          <div className="mt-8">
            <form onSubmit={onSubmit} className="w-10/12 mx-auto md:max-w-md">
              <div className="mb-8">
                <label className="text-white">好きなこと・趣味（※必須）</label>
                <select
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                  {...register("favorite", { required: true })}
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  {myInfo?.favorite === "Programing💻" ? (
                    <option value="Programing💻" selected>
                      プログラミング
                    </option>
                  ) : (
                    <option value="Programing💻">プログラミング</option>
                  )}
                  {myInfo?.favorite === "SOCCER⚽" ? (
                    <option value="SOCCER⚽" selected>
                      サッカー
                    </option>
                  ) : (
                    <option value="SOCCER⚽">サッカー</option>
                  )}
                  {myInfo?.favorite === "Game🎮" ? (
                    <option value="Game🎮" selected>
                      ゲーム
                    </option>
                  ) : (
                    <option value="Game🎮">ゲーム</option>
                  )}
                  {myInfo?.favorite === "Drawing🎨" ? (
                    <option value="Drawing🎨" selected>
                      絵描き
                    </option>
                  ) : (
                    <option value="Drawing🎨">絵描き</option>
                  )}
                  {myInfo?.favorite === "Anime📺" ? (
                    <option value="Anime📺" selected>
                      アニメ
                    </option>
                  ) : (
                    <option value="Anime📺">アニメ</option>
                  )}
                  {myInfo?.favorite === "Drinking🍺" ? (
                    <option value="Drinking🍺" selected>
                      お酒
                    </option>
                  ) : (
                    <option value="Drinking🍺">お酒</option>
                  )}
                </select>
              </div>
              <div>
                <label className="text-white">Twitter ID（※必須）</label>
                <input
                  type="text"
                  placeholder={myInfo?.twitterId ? `${myInfo?.twitterId}` : ""}
                  {...register("twitterId", {
                    required: true,
                    maxLength: 15,
                    pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                  })}
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-900"
                />
                <br />
                {errors.twitterId && (
                  <span>
                    ※Twitter IDは必須入力であり、15文字以内です。
                    <br />
                    また、無効な文字が入力されている可能性があります。
                    <br />
                    変更しない場合は、もう一度同じものを入力してください。
                  </span>
                )}
              </div>
              <div className="mb-8">
                <label className="text-white">
                  Instagram
                  ID（任意：入力なしでも可、変更しない場合は、もう一度同じものを入力してください。）
                </label>
                <input
                  type="text"
                  placeholder={
                    myInfo?.instagramId ? `${myInfo?.instagramId}` : ""
                  }
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-900"
                  {...register("instagramId", {
                    max: 15,
                    pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                  })}
                />
                <br />
                {errors.instagramId && (
                  <span>
                    ※Instagram IDは15文字以内です。
                    <br />
                    無効な文字が入力されている可能性があります。
                  </span>
                )}
              </div>
              <div className="mb-8">
                <label className="text-white">
                  自己紹介（任意：20文字以内、変更しない場合は、もう一度同じものを入力してください。）
                </label>
                <textarea
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-900"
                  placeholder={
                    myInfo?.description ? `${myInfo?.description}` : ""
                  }
                  {...register("description", { maxLength: 20 })}
                ></textarea>
              </div>
              <input
                type="submit"
                value="更新"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
