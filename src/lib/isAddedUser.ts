import { useAuth } from "context/useAuth";
import { db } from "utils/Firebase";

const isAddedUser = (email: string | null | undefined) => {
  var docRef = db.collection("users").doc("0Cf48Z0oRH9aLkAJFhFe");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return false;
      }
    })
    .catch((error) => {
      return error;
    });
};

export default isAddedUser;
