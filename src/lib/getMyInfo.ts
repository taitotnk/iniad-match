import { db } from "~/utils/Firebase";

export const getMyInfo = async (email: string | undefined | null) => {
  if (email) {
    const userData = await db
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        let data = [];
        data.push(doc.data());
        return data;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        return [];
      });

    return userData;
  }
};
