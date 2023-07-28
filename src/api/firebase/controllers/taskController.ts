import { db } from "../firebase.config";
import { doc, setDoc, deleteDoc, updateDoc, getDocs,query,collection,where } from "firebase/firestore";
import Task from "../../../types/Task/Task";
export async function setTask(task : Task){
    await setDoc(doc(db, "tasks", task.id), task);
}
export async function updateTask(task: Task){
    await setDoc(doc(db,'tasks',task.id), task , {merge:true})
}
export async function deleteTask(id: string){
    await deleteDoc(doc(db,'tasks',id))
}
export async function getTasks(userId : string){
    const q = query(collection(db, "tasks"), where("ownerId", "==", userId));
    let tasks : Task[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        tasks.push(doc.data())
    })
    return tasks
}