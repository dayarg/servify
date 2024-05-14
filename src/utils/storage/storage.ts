import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../../firebase/config"

export const uploadDocs = async(file: any, userId: any, tipo: any) => {
    const storageRef = ref(storage, `proveedoresDocs/${userId}/${tipo}-${userId}`);
    return await uploadBytes(storageRef, file);
}