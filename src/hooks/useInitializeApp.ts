import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../types/User';
import { fetchUser, selectCurrentUser,setUser } from '../store/slices/userSlice';
import { fetchTags, setTags } from '../store/slices/tagsSlice';
import { fetchTasks, setTasks } from '../store/slices/tasksSlice';
const useInitializeApp = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("Initializing app...")
        let user = currentUser
        if(!user) user = (await dispatch(fetchUser(123))).payload
        console.log(user)
        dispatch(setUser(user)); // Set the user in the store
        await Promise.all([
          dispatch(fetchTags(user.id)),
          dispatch(fetchTasks(user.id))
        ]);
      } catch (error) {
        console.error(error)
      }
    };
    initialize();
  }, [dispatch]);

  return null; 
};

export default useInitializeApp;