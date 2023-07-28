import {getRedirectResult,GoogleAuthProvider} from 'firebase/auth'
import {auth} from './firebase.config'
import { useDispatch } from 'react-redux';
import {setUser, setUserInDB,fetchUser} from '../../store/slices/userSlice'
import { fetchTags } from '../../store/slices/tagsSlice';
import { fetchTasks } from '../../store/slices/tasksSlice';
export default function getLoginResult(dispatch){
    getRedirectResult(auth)
    .then( async (result) => {
    if(!result) return
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const userFromDB = await dispatch(fetchUser(user.uid));
    if(!userFromDB.payload){
        console.log("New user")
        const newUser = {
        email: user.email,
        id: user.uid,
        tagsIds: [],
        createdAt: Date.now(),
        img: user.photoURL
        }
        dispatch(setUserInDB(newUser))
        dispatch(setUser(newUser))
        dispatch(fetchTags(null))
        dispatch(fetchTasks(null))
    }
    }).catch((error) => {
    const errorMessage = error.message;
    console.error(errorMessage)
    });
}