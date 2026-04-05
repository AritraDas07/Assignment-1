/* Task card — pure presentational component, ZERO hooks */
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const Task = ({ id, name, status, description, isEditing, onDelete, onUpdate, onCardClick, index = 0 }) => {

  const statusColor = {
    Pending: '#f59e0b',
    'In Progress': '#3b82f6',
    Complete: '#22c55e',
  };

  const statusBg = {
    Pending: 'rgba(245,158,11,0.12)',
    'In Progress': 'rgba(59,130,246,0.12)',
    Complete: 'rgba(34,197,94,0.12)',
  };

  /* If the card is in edit mode (newly created), render an input */
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="task-card task-card-editing"
      >
        <input
          className="task-card-inline-input"
          type="text"
          defaultValue={name === 'Untitled Task' ? '' : name}
          placeholder="Enter task name…"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = e.target.value.trim() || 'Untitled Task';
              onUpdate(id, { name: val, isEditing: false });
            }
          }}
          onBlur={(e) => {
            const val = e.target.value.trim() || 'Untitled Task';
            onUpdate(id, { name: val, isEditing: false });
          }}
        />
        <div className="task-card-hint">Press Enter to save</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.02}
        transitionSpeed={400}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        className="h-full"
      >
        <div
          className="task-card"
          style={{ height: '100%', cursor: 'pointer' }}
          onClick={() =>
            onCardClick({ id, name, status, description })
          }
        >
          <div className="task-card-header">
            <span
              className="task-status-badge"
              style={{
                color: statusColor[status] || '#f59e0b',
                backgroundColor: statusBg[status] || 'rgba(245,158,11,0.12)',
                borderColor: statusColor[status] || '#f59e0b',
              }}
            >
              {status}
            </span>
            <button
              className="task-delete-btn"
              title="Delete Task"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              ✕
            </button>
          </div>
          <h3 className="task-card-name">{name}</h3>
          {description && (
            <p className="task-card-desc">{description}</p>
          )}
          <div className="task-card-footer">
            <span className="task-card-id">#{id.slice(0, 6)}</span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default Task;
