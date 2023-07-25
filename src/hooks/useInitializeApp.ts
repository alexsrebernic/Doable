import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../types/User';
import { fetchUser, selectCurrentUser,setUser } from '../store/slices/userSlice';
import { fetchTags, setTags } from '../store/slices/tagsSlice';
import { fetchTasks, setTasks } from '../store/slices/tasksSlice';
import checkIfIsExpired from '../helper/isDateExpired'
const useInitializeApp = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("Initializing app...")
        let user : User | null = currentUser
        if(!user){
          setAnonymusUser(dispatch)
          await fetchData(dispatch,null)
        } else {
          if(user.id === 'anonymus' ){
            if(checkIfIsExpired(user.createdAt)){
                console.log("User expired")
                setAnonymusUser(dispatch)
                fetchData(dispatch,null)
              }
          } else {
            await fetchData(dispatch,user.id)
          }
        }
      } catch (error) {
        console.error(error)
      }
    };
    initialize();
  }, [dispatch]);

  return null; 
};

function setAnonymusUser(dispatch){
  dispatch(setUser(
    {
      id:'anonymus',
      createdAt: Date.now(),
      tagsIds: [],
      email: null
    }
  ))
}
async function fetchData(dispatch, userId){
  await Promise.all([
    dispatch(fetchTags(userId)),
    dispatch(fetchTasks(userId))
  ]);
}

export default useInitializeApp;