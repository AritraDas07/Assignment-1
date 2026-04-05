import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

// Persist tasks to localStorage on every state change
store.subscribe(() => {
  try {
    const serialized = JSON.stringify(store.getState().tasks.tasks);
    localStorage.setItem('tasks', serialized);
  } catch {
    // ignore write errors
  }
});

export default store;
