import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, updateTask, cloneTask } from '../reducers/taskSlice';
import { Select, Button } from '@mantine/core';
import Task from './Task';
import TaskModal from './TaskModal';
import { motion } from 'framer-motion';

const Board = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [modalTask, setModalTask] = useState(null);
  const [cloneDropdownOpen, setCloneDropdownOpen] = useState(false);

  const handleCreate = () => {
    dispatch(addTask({ isEditing: true }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (id, changes) => {
    dispatch(updateTask({ id, ...changes }));
  };

  const handleCardClick = (task) => {
    setModalTask(task);
  };

  const handleCloneSelect = (taskId) => {
    if (taskId) {
      dispatch(cloneTask(taskId));
      setCloneDropdownOpen(false);
    }
  };

  const cloneOptions = tasks.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="board-container"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="board-toolbar"
      >
        <div className="board-count">
          <span className="board-count-number">{tasks.length}</span>
          <span className="board-count-label">{tasks.length === 1 ? 'Task' : 'Tasks'}</span>
        </div>
        <div className="board-actions">
          <div className="clone-wrapper">
            {cloneDropdownOpen ? (
              <Select
                className="clone-select"
                placeholder="Pick task to clone…"
                data={cloneOptions}
                onChange={handleCloneSelect}
                searchable
                nothingFoundMessage="No tasks yet"
                onDropdownClose={() => setCloneDropdownOpen(false)}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    color: '#fff',
                    borderRadius: '12px',
                    minWidth: '220px',
                  },
                  dropdown: {
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(139,92,246,0.3)',
                  },
                  option: { color: '#e2e0ea' },
                }}
              />
            ) : (
              <Button
                variant="light"
                color="violet"
                onClick={() => setCloneDropdownOpen(true)}
                disabled={tasks.length === 0}
                className="board-btn clone-btn"
              >
                ⧉ Clone Task
              </Button>
            )}
          </div>
          <Button
            variant="gradient"
            gradient={{ from: '#7c3aed', to: '#06b6d4' }}
            onClick={handleCreate}
            className="board-btn create-btn"
          >
            + Create Task
          </Button>
        </div>
      </motion.div>

      {tasks.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="empty-state"
        >
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">No tasks yet</h3>
          <p className="empty-state-msg">
            Click <strong>Create Task</strong> to get started
          </p>
        </motion.div>
      ) : (
        <div className="task-grid">
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              status={task.status}
              description={task.description}
              isEditing={task.isEditing}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onCardClick={handleCardClick}
              index={index}
            />
          ))}
        </div>
      )}

      {modalTask && (
        <TaskModal
          task={modalTask}
          opened={!!modalTask}
          onClose={() => setModalTask(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </motion.div>
  );
};

export default Board;
