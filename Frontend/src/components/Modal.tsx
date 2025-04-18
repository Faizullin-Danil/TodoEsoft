import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box
} from '@mui/material';

import { Task } from '../interfaces/ITask';
import { User } from '../interfaces/IUser';
import { FormData } from '../interfaces/IFormData';
import { Errors } from '../interfaces/IErrors';

const priorities = ['Низкий', 'Средний', 'Высокий'];
const status = ['к выполнению', 'выполняется', 'выполнена', 'отменена'];

interface TaskModalProps {
  task: Task | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  role: string;
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  setTasks,
  role,
  open,
  setModalOpen,
  setSelectedTask,
  users,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    responsible: '',
    status: 'Ожидает',
  });

  const [errors, setErrors] = useState<Errors>({
    title: false,
    description: false,
    priority: false,
    dueDate: false,
    responsible: false,
    status: false,
  });


  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || '',
        dueDate: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
        responsible: task.responsible,
        status: task.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        responsible: '',
        status: 'Ожидает',
      });
    }

    setErrors({
      title: false,
      description: false,
      priority: false,
      dueDate: false,
      responsible: false,
      status: false,
    });
  }, [task]);

  const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = () => {
    const newErrors: Errors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      priority: !formData.priority,
      dueDate: !formData.dueDate,
      responsible: !formData.responsible.trim(),
      status: !formData.status,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v);
    if (hasError) return;

    const createOrEditTask: Task = {
      ...task!,
      ...formData,
      due_date: new Date(formData.dueDate),
      updated_date: new Date(),
      status: formData.status as Task['status'],
    };
    

    setTasks((prevTasks) => {
      if (task) {
        return prevTasks.map((t) => (t.id === task.id ? { ...t, ...createOrEditTask } : t));
      } else {
        return [...prevTasks, createOrEditTask];
      }
    });

    onClose();
  };

  const onClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  console.log('задача', formData)

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{task ? 'Редактировать задачу' : 'Новая задача'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        {role === 'admin' && (
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <TextField
              sx={{ mt: 1 }}
              label="Название"
              fullWidth
              value={formData.title}
              onChange={handleChange('title')}
              error={errors.title}
              helperText={errors.title && 'Заполните название'}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Описание"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange('description')}
              error={errors.description}
              helperText={errors.description && 'Заполните описание'}
            />
            <TextField
              label="Приоритет"
              select
              fullWidth
              value={formData.priority}
              onChange={handleChange('priority')}
              error={errors.priority}
              helperText={errors.priority && 'Выберите приоритет'}
            >
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="Срок выполнения"
              fullWidth
              value={formData.dueDate}
              onChange={handleChange('dueDate')}
              error={errors.dueDate}
              helperText={errors.dueDate && 'Укажите срок'}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Ответственный"
              select
              fullWidth
              value={formData.responsible}
              onChange={handleChange('responsible')}
              error={errors.responsible}
              helperText={errors.responsible && 'Выберите ответственного'}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        {task && (
          <TextField
            sx={{ mt: role === 'admin' ? 0 : 1 }}
            label="Статус"
            select
            fullWidth
            value={formData.status}
            onChange={handleChange('status')}
            error={errors.status}
            helperText={errors.status && 'Выберите статус'}
          >
            {status.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {task ? 'Сохранить' : 'Добавить задачу'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
