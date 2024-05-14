import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const providerSnapshot = async (
  formData: any,
  collectionName: string
) => {
  const providerSnapshotColl = await getDocs(
    query(collection(db, collectionName), where("correo", "==", formData.email))
  );
  return providerSnapshotColl;
};

export const providerGoogle = async (email: string | null, collectionName: string) => {
    const googleSnapshot = getDocs(
        query(
          collection(db, collectionName),
          where("correo", "==", email)
        )
      );
    return googleSnapshot;
}
