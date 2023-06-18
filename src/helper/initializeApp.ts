import { useDispatch } from 'react-redux';
import { User } from '../types/User';
import { fetchUser } from '../store/slices/userSlice';
import { fetchTags } from '../store/slices/tagsSlice';
import { fetchTasks } from '../store/slices/tasksSlice';
import { setTags,setTasks,setUser,getCurrentUser } from '../store';
export const initializeApp = async () => {
    const dispatch = useDispatch();
    try {
      let user = dispatch(getCurrentUser())
      if(!user) user = await dispatch(fetchUser(userId));
      if (user.payload) {
        const user = user.payload;
        dispatch(setUser(user)); // Set the user in the store
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
      }
    } catch (error) {
      console.error(error)
    }
  };