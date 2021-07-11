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
    if (window.confirm("登録しますか？"))
      db.collection("users")
        .add({
          email: currentUser?.email,
          name: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
          favolite: data.favorite,
          twitterId: data.twitterId,
          instagramId: data.instagramId,
          lineId: data.lineId,
          description: data.description,
        })
        .then(() => {
          Router.push("/");
        })
        .catch(() => {
          alert("登録に失敗しました");
        });
  });

  return (
    <div className="container mx-auto">
      {currentUser && (
        <div>
          <h1>プロフィール設定</h1>
          <Image
            className="rounded-full h-24 w-24 flex items-center justify-center"
            src={currentUser.photoURL}
            width={100}
            height={100}
            quality={90}
            // layout={"responsive"}
            alt="profile_img"
          />
          <h2>{currentUser.displayName}</h2>
          <form onSubmit={onSubmit}>
            <label>好きなこと：</label>
            <select {...register("favorite", { required: true })}>
              <option value="" disabled selected>
                選択してください
              </option>
              <option value="programing">プログラミング</option>
              <option value="soccer">サッカー</option>
            </select>
            <div>
              <label>Twitter ID：</label>
              <input
                type="text"
                placeholder="taito_1211"
                {...register("twitterId", {
                  required: true,
                  maxLength: 15,
                  pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                })}
              />
              <br />
              {errors.twitterId && (
                <span>※Twitter IDは必須入力であり、15文字以内です。</span>
              )}
            </div>
            <div>
              <label>Instagram ID：</label>
              <input
                type="text"
                placeholder="taito_1211"
                {...register("instagramId", {
                  max: 15,
                  pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                })}
              />
              <br />
              {errors.instagramId && (
                <span>
                  ※Instagram
                  IDは15文字以内です。無効な文字が入力されている可能性があります。
                </span>
              )}
            </div>
            {/* <div>
              <label>LINE ID：</label>
              <input
                type="text"
                placeholder="taito_1211"
                {...register("lineId", {
                  maxLength: 15,
                  pattern: /^[a-zA-Z0-9_\-.]{3,15}$/i,
                })}
              />
              <br />
              {errors.lineId && (
                <span>
                  ※LINE
                  IDは15文字以内です。無効な文字が入力されている可能性があります。
                </span>
              )}
            </div> */}
            <div>
              <label>自己紹介：</label>
              <input
                type="text"
                placeholder="よろしくおねがいします！"
                {...register("description", { maxLength: 20 })}
              />
            </div>
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddUser;
