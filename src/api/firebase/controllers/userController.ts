import { db } from "../firebase.config";
import { doc, setDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import {User} from '../../../types/User'
export async function setUser(user : User){
    await setDoc(doc(db, "users", user.id), user);
}
export async function updateUser(user: User){
    await setDoc(doc(db,'users',user.id), user , {merge:true})
}
export async function getUser(userId){
    const user = await getDoc(doc(db,'users',userId))
    return user.exists() ? user.data() : null
}