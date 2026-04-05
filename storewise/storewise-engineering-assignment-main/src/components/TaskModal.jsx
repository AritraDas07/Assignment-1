import { useState } from 'react';
import { Modal, TextInput, Textarea, Select, Button, Badge } from '@mantine/core';

const TaskModal = ({ task, opened, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(task.name);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description || '');

  const statusColor = {
    Pending: 'yellow',
    'In Progress': 'blue',
    Complete: 'green',
  };

  const handleSave = () => {
    onUpdate(task.id, {
      name: name.trim() || 'Untitled Task',
      status,
      description,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
            Task Details
          </span>
          <Badge color={statusColor[status]} variant="light" size="lg">
            {status}
          </Badge>
        </div>
      }
      centered
      size="lg"
      radius="xl"
      overlayProps={{ backgroundOpacity: 0.6, blur: 8 }}
      styles={{
        header: {
          backgroundColor: '#0f0c24',
          borderBottom: '1px solid rgba(139,92,246,0.2)',
          padding: '20px 28px',
        },
        body: {
          backgroundColor: '#0f0c24',
          padding: '28px',
        },
        content: {
          backgroundColor: '#0f0c24',
          border: '1px solid rgba(139,92,246,0.2)',
        },
        close: { color: '#aaa6c3' },
      }}
    >
      <div className="modal-form">
        <TextInput
          label="Task Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter task name"
          styles={{
            label: { color: '#aaa6c3', marginBottom: '6px', fontWeight: 500 },
            input: {
              backgroundColor: '#050816',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '15px',
            },
          }}
        />

        <Select
          label="Status"
          value={status}
          onChange={setStatus}
          data={['Pending', 'In Progress', 'Complete']}
          styles={{
            label: { color: '#aaa6c3', marginBottom: '6px', fontWeight: 500 },
            input: {
              backgroundColor: '#050816',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '15px',
            },
            dropdown: {
              backgroundColor: '#1a1a2e',
              border: '1px solid rgba(139,92,246,0.3)',
            },
            option: { color: '#e2e0ea' },
          }}
          mt="md"
        />

        <Textarea
          label="Description / Notes"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder="Add notes or description…"
          minRows={4}
          autosize
          styles={{
            label: { color: '#aaa6c3', marginBottom: '6px', fontWeight: 500 },
            input: {
              backgroundColor: '#050816',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '15px',
            },
          }}
          mt="md"
        />

        <div className="modal-actions">
          <Button
            variant="light"
            color="red"
            onClick={handleDelete}
            radius="xl"
            size="md"
          >
            Delete Task
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: '#7c3aed', to: '#06b6d4' }}
            onClick={handleSave}
            radius="xl"
            size="md"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
