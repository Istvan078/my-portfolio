import app from "../../environments.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  updateDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(app);

///////////////////// FIRESTORE SERVICE ////////////////////////
class FirestoreService {
  async addProject(project) {
    try {
      const docRef = await addDoc(collection(db, "projects"), project);
      await updateDoc(docRef, { id: docRef.id });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAllProjects() {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.timeString = new Date(data.modifiedAt).toDateString();
        projects.push(data);
      });
      return projects;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  async getProject(projectId) {
    try {
      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        return projectSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  async updateProject(projectId, project) {
    try {
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, project);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
}

export default new FirestoreService();
