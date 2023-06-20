import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../types/User';
import { fetchUser, getCurrentUser } from '../store/slices/userSlice';
import { fetchTags, setTags } from '../store/slices/tagsSlice';
import { fetchTasks, setTasks } from '../store/slices/tasksSlice';
const useInitializeApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("Initializing app...")
        let user = await dispatch(getCurrentUser())
        const userId = 123
        // const user = user.payload;
        // dispatch(setUser(user)); // Set the user in the store
        const [tagsAction, tasksAction] = await Promise.all([
          dispatch(fetchTags(userId)),
          dispatch(fetchTasks(userId))
        ]);
        if (tagsAction.payload) {
          dispatch(setTags(tagsAction.payload));
        }
        if (tasksAction.payload) {
          dispatch(setTasks(tasksAction.payload));
        }
      } catch (error) {
        console.error(error)
      }
    };

    initialize();
  }, [dispatch]);

  return null; 
};

export default useInitializeApp;