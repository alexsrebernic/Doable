import { Tag } from "../types/Tag/Tag";
import Task from "../types/Task/Task";

export const mockTags : Tag[] = [
    {
      name: 'Work',
      icon: 'work-icon',
      ownerId: 1,
      id: 1,
      numberOfTasks: 3,
      theme: 'blue',
      tasksIds: [1, 2, 3],
    },
    {
      name: 'Personal',
      icon: 'personal-icon',
      id: 2,
      ownerId: 1,
      numberOfTasks: 2,
      theme: 'green',
      tasksIds: [4, 5],
    },
    // Add more mock tags here
  ];
  
  // Mock data for tasks
export const mockTasks : Task[] = [
    {
      text: 'Complete project report',
      ownerId: 1,
      id: 1,
      completed: false,
      createdAt: new Date(),
      tagId: 1,
      favorite: false,
    },
    {
      text: 'Prepare presentation slides',
      ownerId: 1,
      id: 2,
      completed: false,
      createdAt: new Date(),
      tagId: 1,
      favorite: true,
    },
    {
      text: 'Send email to client',
      ownerId: 1,
      id: 3,
      completed: false,
      createdAt: new Date(),
      tagId: 1,
      favorite: false,
    },
    {
      text: 'Go grocery shopping',
      ownerId: 1,
      id: 4,
      completed: false,
      createdAt: new Date(),
      tagId: 2,
      favorite: true,
    },
    {
      text: 'Exercise for 30 minutes',
      ownerId: 1,
      id: 5,
      completed: false,
      createdAt: new Date(),
      tagId: 2,
      favorite: false,
    },
    // Add more mock tasks here
  ];
export const mockUser = {
    id: 1,
    email: 'example@example.com',
    tagsId: [1, 2],
    createdAt: new Date(),
};