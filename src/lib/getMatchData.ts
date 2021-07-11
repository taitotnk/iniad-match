import { db } from "utils/Firebase";
import { useAuth } from "context/useAuth";

const getMatchData = (favorite: string) => {
  db.collection("users")
    .where("favorite", "==", favorite)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        return doc.data();
      });
    })
    .catch((error) => {
      return console.error(error);
    });
};

export default getMatchData;
