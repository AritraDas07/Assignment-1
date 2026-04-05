import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const loadTasksFromStorage = () => {
  try {
    const serialized = localStorage.getItem('tasks');
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch {
    return [];
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ name, status, description, isEditing } = {}) {
        return {
          payload: {
            id: uuidv4(),
            name: name || 'Untitled Task',
            status: status || 'Pending',
            description: description || '',
            isEditing: isEditing ?? false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTask(state, action) {
      const { id, ...changes } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, changes);
      }
    },
    cloneTask(state, action) {
      const source = state.tasks.find((t) => t.id === action.payload);
      if (source) {
        state.tasks.push({
          id: uuidv4(),
          name: `${source.name} (Copy)`,
          status: source.status,
          description: source.description,
          isEditing: false,
          createdAt: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, cloneTask } = taskSlice.actions;
export default taskSlice.reducer;
