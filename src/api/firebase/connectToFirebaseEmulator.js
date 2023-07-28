import { connectAuthEmulator } from "firebase/auth"
import { connectFirestoreEmulator } from "firebase/firestore"
import { auth, db } from "./firebase.config"

export default function connectToFirebaseEmulator(){
    try {
        connectFirestoreEmulator(db,"127.0.0.1",8080)
        connectAuthEmulator(auth,"http://127.0.0.1:9099")
    } catch (e){
        console.error(e)
    }
}