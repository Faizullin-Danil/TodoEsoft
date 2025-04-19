import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { Task } from '../interfaces/ITask';
import { User } from '../interfaces/IUser';
import { FormData } from '../interfaces/IFormData';
import { Errors } from '../interfaces/IErrors';
import TaskService from '../services/tasksApi';
import { jwtDecode } from 'jwt-decode';

const taskService = new TaskService();
const priorities = ['низкий', 'средний', 'высокий'];
const statuses = ['к выполнению', 'выполняется', 'выполнена', 'отменена'];

interface TaskModalProps {
  id: string;
  task: Task | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  role: string;
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  id,
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
    status: 'к выполнению',
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
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
        responsible: task.responsible_id || '',
        status: task.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        responsible: role === 'Пользователь' ? id : '',
        status: 'к выполнению',
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
  }, [task, id, role]);

  const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      priority: !formData.priority,
      dueDate: !formData.dueDate,
      responsible: !formData.responsible,
      status: !formData.status,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      if (!task) {
        const tokens = JSON.parse(localStorage.getItem('auth') || '{}');
        const userData: any = jwtDecode(tokens.token);

        const newTask = {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          due_date: new Date(formData.dueDate),
          status: 'к выполнению',
          creator_id: userData.id,
          responsible_id: formData.responsible,
          created_date: new Date(),
          updated_date: new Date(),
        };

        const createdTask = await taskService.createTask(newTask);
        setTasks(prev => [...prev, createdTask]);
      } else {
        const updatedTask: Task = {
          ...task,
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          due_date: new Date(formData.dueDate),
          status: formData.status,
          responsible_id: formData.responsible,
          updated_date: new Date(),
        };

        await taskService.updateTask(task.id, updatedTask);
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      }

      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении задачи', error);
    }
  };

  const onClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const isCreating = !task;
  const isUser = role === 'Пользователь';
  const isManager = role === 'Руководитель';

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isCreating ? 'Новая задача' : 'Редактировать задачу'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        {(role === 'Руководитель' || (role === 'Пользователь' && !task)) && (
          <TextField
            sx={{mt: 1}}
            label="Название"
            fullWidth
            value={formData.title}
            onChange={handleChange('title')}
            error={errors.title}
            helperText={errors.title && 'Заполните название'}
          />
        )}
          {(role === 'Руководитель' || (role === 'Пользователь' && !task)) && (<TextField
            label="Описание"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange('description')}
            error={errors.description}
            helperText={errors.description && 'Заполните описание'}
          />)}
          {(role === 'Руководитель' || (role === 'Пользователь' && !task)) && (<TextField
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
          </TextField>)}

          {(role === 'Руководитель' || (role === 'Пользователь' && !task)) && ( <TextField
            type="date"
            label="Срок выполнения"
            fullWidth
            value={formData.dueDate}
            onChange={handleChange('dueDate')}
            error={errors.dueDate}
            helperText={errors.dueDate && 'Укажите срок'}
            InputLabelProps={{ shrink: true }}
          />)}

          {role === 'Руководитель' && (
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
                  {`${user.lastname} ${user.name} ${user.patronymic}`}
                </MenuItem>
              ))}
            </TextField>
          )}

          {task && (
            <TextField
              sx={{mt: 1}}
              label="Статус"
              select
              fullWidth
              value={formData.status}
              onChange={handleChange('status')}
              error={errors.status}
              helperText={errors.status && 'Выберите статус'}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>    
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isCreating ? 'Добавить задачу' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
