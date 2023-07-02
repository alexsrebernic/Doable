import { Tag } from "../types/Tag/Tag";
import Task from "../types/Task/Task";
import { User } from "../types/User";

export const mockTags : Tag[] = [
    {
      name: 'Work',
      icon: null,
      ownerId: "1",
      id: "1",
      numberOfTasks: 3,
      theme: 'blue',
      tasksIds: ["1", "2", "3"],
    },
    {
      name: 'Personal',
      icon: null,
      id: "2",
      ownerId:" 1",
      numberOfTasks: 2,
      theme: 'green',
      tasksIds: ["4", "5"],
    },
    // Add more mock tags here
  ];
  
  // Mock data for tasks
export const mockTasks : Task[] = [
    {
      text: 'Complete project report',
      tagName: 'Work',
      ownerId: "1",
      id: "1",
      completed: false,
      createdAt: new Date(),
      tagId: "1",
      important: false,
      dueDate: null,
      repeat: null,
    },
    {
      text: 'Prepare presentation slides',
      ownerId: "1",
      tagName: 'Work',
      id: "2",
      completed: false,
      createdAt: new Date(),
      tagId: "1",
      important: true,
      dueDate: null,
      repeat: null,
    },
    {
      text: 'Send email to client',
      ownerId: "1",
      id: "3",
      tagName: 'Work',
      completed: false,
      createdAt: new Date(),
      tagId: "1",
      important: false,
      dueDate: null,
      repeat: null,
    },
    {
      text: 'Go grocery shopping',
      ownerId: "1",
      tagName: 'Personal',
      id: "4",
      completed: false,
      createdAt: new Date(),
      tagId: "2",
      important: true,
      dueDate: null,
      repeat: null,
    },
    {
      text: 'Exercise for 30 minutes',
      tagName: 'Personal',
      ownerId: "1",
      id: "5",
      completed: false,
      createdAt: new Date(),
      tagId: "2",
      important: false,
      dueDate: null,
      repeat: null,
    },
    // Add more mock tasks here
  ];
export const mockUser : User = {
    id: "1",
    email: 'example@example.com',
    tagsIds: ["1", "2"],
    createdAt: new Date(),
};