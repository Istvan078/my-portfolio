import app from "../../environments.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

////////////////////// FIREBASE STORAGE INITIALIZATION ////////////////////////
const storage = getStorage(app);

///////////////////// FIRESTORAGE SERVICE ////////////////////////
class FireStorageService {
  async uploadFile(filePath, blob) {
    const storageRef = ref(storage, filePath);
    const res = await uploadBytes(storageRef, blob, { contentType: blob.type });
    console.log(res);
    const downloadURL = await getDownloadURL(res.ref);
    return downloadURL;
  }
}

export default new FireStorageService();
