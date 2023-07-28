import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../types/User';
import {  fetchUser, selectCurrentUser,setUser, setUserInDB } from '../store/slices/userSlice';
import { fetchTags } from '../store/slices/tagsSlice';
import { fetchTasks } from '../store/slices/tasksSlice';
import checkIfIsExpired from '../helper/isDateExpired'
import getLoginResult from '../api/firebase/getLogInResult'
import connectToFirebaseEmulator from '../api/firebase/connectToFirebaseEmulator'
import { onAuthStateChanged } from 'firebase/auth';
import{auth} from '../api/firebase/firebase.config'
const useInitializeApp = () => {
  const dispatch = useDispatch();
  getLoginResult(dispatch)
  let currentUser = useSelector(selectCurrentUser)
  useEffect(() => {
    console.log("Initialize app")
    if(process.env.NODE_ENV === 'development') connectToFirebaseEmulator()
    const initialize = async () => {
      try {
        onAuthStateChanged(auth,async (result) => {
          console.log("Auth state changed")
          if(currentUser){
            console.log("Current user avalaible")
            if(result){
              console.log("User is logged in")
              const userFromDB =await  (dispatch(fetchUser(result.uid)))
              if(userFromDB.payload){
              console.log("User from db getted")
                await fetchData(dispatch,userFromDB.payload.id)
                dispatch(setUser(userFromDB.payload))
              } else {
                console.log("New user")
                setNewUser(dispatch,result)
              }
            } else {
              if(currentUser.id == 'anonymus'){
                console.log("current user is anonymus")
                if(checkIfIsExpired(currentUser.createdAt)){
                console.log("current user anonymus is expired")
                  setAnonymusUser(dispatch)
                  fetchData(dispatch,null)
                }
              } 
            }
          } else {
            if(result){
              const userFromDB = dispatch(fetchUser(result.uid))
              if(userFromDB){
              console.log("User from db getted")
                await fetchData(dispatch,result.uid)
                dispatch(setUser(userFromDB))
              } else {
                console.log("New user")
                setNewUser(dispatch,result)
              }
            } else {
              console.log("Setting anonymus user")
              setAnonymusUser(dispatch)
              await fetchData(dispatch,null)
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    };
    initialize();
  }, []);

  return null; 
};

function setAnonymusUser(dispatch){
  dispatch(setUser(
    {
      id:'anonymus',
      createdAt: Date.now(),
      tagsIds: [],
      email: null,
      img : ""
    }
  ))
}
function setNewUser(dispatch,result){
  const newUser = {
    email: result.email,
    id: result.uid,
    tagsIds: [],
    createdAt: Date.now(),
    img: result.photoURL
    }
    dispatch(setUserInDB(newUser))
    dispatch(setUser(newUser))
    fetchData(dispatch,null)
}
async function fetchData(dispatch, userId){
  await Promise.all([
    dispatch(fetchTags(userId)),
    dispatch(fetchTasks(userId))
  ]);
}

export default useInitializeApp;