import { FC } from "react";
import { useAuth } from "context/useAuth";
import Router from "next/router";
import Image from "next/image";
import { db } from "utils/Firebase";
import { useForm } from "react-hook-form";

type FormState = {
  favorite: string;
  twitterId: string;
  instagramId: string;
  lineId: string;
  description: string;
};

const AddUser: FC = () => {
  const { currentUser } = useAuth();
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
      lineId: "",
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
      lineId: data.lineId,
      description: data.description,
    };

    if (window.confirm("登録しますか？"))
      if (currentUser?.email) {
        db.collection("users")
          .doc(currentUser?.email)
          .set(userData)
          .then(() => {
            Router.push("/");
          })
          .catch(() => {
            alert("登録に失敗しました");
          });
      }
  });

  return (
    <div className="container mx-auto">
      {currentUser && (
        <div>
          <h1 className="text-white">プロフィール設定</h1>
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
                  <option value="" disabled selected>
                    選択してください
                  </option>
                  <option value="Programing💻">プログラミング</option>
                  <option value="SOCCER⚽">サッカー</option>
                  <option value="Game🎮">ゲーム</option>
                  <option value="Drawing🎨">絵描き</option>
                  <option value="Anime📺">アニメ</option>
                  <option value="Drinking🍺">お酒</option>
                </select>
              </div>
              <div>
                <label className="text-white">Twitter ID（※必須）</label>
                <input
                  type="text"
                  placeholder="example_0000"
                  {...register("twitterId", {
                    required: true,
                    maxLength: 15,
                    pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                  })}
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                />
                <br />
                {errors.twitterId && (
                  <span>
                    ※Twitter IDは必須入力であり、15文字以内です。
                    <br />
                    また、無効な文字が入力されている可能性があります。
                  </span>
                )}
              </div>
              <div className="mb-8">
                <label className="text-white">
                  Instagram ID（任意：入力なしでも可）
                </label>
                <input
                  type="text"
                  placeholder="example-0000"
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
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
                  自己紹介（任意：20文字以内）
                </label>
                <textarea
                  className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                  placeholder="よろしくおねがいします！"
                  {...register("description", { maxLength: 20 })}
                ></textarea>
              </div>
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
