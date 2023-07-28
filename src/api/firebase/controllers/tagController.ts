import { db } from "../firebase.config";
import { doc, setDoc, deleteDoc, updateDoc, getDocs,query,collection,where } from "firebase/firestore";
import { Tag } from "../../../types/Tag/Tag";
export async function setTag(tag : Tag){
    await setDoc(doc(db, "tags", tag.id), tag);
}
export async function updateTag(tag: Tag){
    await setDoc(doc(db,'tags',tag.id), tag , {merge:true})
}
export async function deleteTag(tagId: string){
    await deleteDoc(doc(db,'tags',tagId))
}
export async function getTags(userId : string){
    const q = query(collection(db, "tags"), where("ownerId", "==", userId));
    let tags : Tag[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach(doc => {
        tags.push(doc.data())
    })
    return tags
}