import React from 'react';
import { Box, Button, Autocomplete, TextField } from '@mui/material';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal';
import { useState } from 'react';

const arrayTasks = [
    { title: 'задача 1', priority: 'Средний', dueDate: new Date(2025, 3, 23), responsible: 'Захар', status: 'На выполнении', updatedAt: new Date(2020, 0, 26) },
    { title: 'задача 2', priority: 'Высокий', dueDate: new Date(2025, 3, 16), responsible: 'Алина', status: 'Выполняется', updatedAt: new Date(2025, 3, 9) },
    { title: 'задача 3', priority: 'Низкий', dueDate: new Date(2025, 4, 20), responsible: 'Иван', status: 'Ожидает', updatedAt: new Date(2025, 3, 15) },
    { title: 'задача 4', priority: 'Средний', dueDate: new Date(2025, 3, 18), responsible: 'Мария', status: 'На выполнении', updatedAt: new Date(2025, 3, 16) },
    { title: 'задача 5', priority: 'Высокий', dueDate: new Date(2025, 4, 1), responsible: 'Никита', status: 'Завершена', updatedAt: new Date(2025, 3, 10) },
    { title: 'задача 6', priority: 'Низкий', dueDate: new Date(2025, 3, 30), responsible: 'Ольга', status: 'Отменена', updatedAt: new Date(2025, 3, 12) }
  ];

const TasksPageByRole = ({ role }) => {
  const [tasks, setTasks] = useState(arrayTasks);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [responsibleFilter, setResponsibleFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleClear = () => {
    setDateFilter(null);
    setResponsibleFilter(null);
  };

  const onToday = new Date();
  const onWeek = new Date();
  onWeek.setDate(onWeek.getDate() + 7);

  const filteredTasks = tasks.filter((task) => {
    const due = task.dueDate;

    const matchesDate = !dateFilter || (
      dateFilter === 'На сегодня' && due.toDateString() === onToday.toDateString() ||
      dateFilter === 'На неделю' && due > onToday && due <= onWeek ||
      dateFilter === 'На будущее' && due > onWeek
    );

    const matchesResponsible = !responsibleFilter || task.responsible === responsibleFilter;

    return matchesDate && matchesResponsible;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        {/* Только для админа */}
        {role === 'admin' && (
          <>
            <Button onClick={() => setModalOpen(true)} sx={{ color: 'black', '&:focus': { outline: 'none' } }}>
              Новая задача
            </Button>
          </>
        )}

        <Autocomplete
          disablePortal
          value={dateFilter}
          onChange={(_, newValue) => setDateFilter(newValue)}
          options={['На сегодня', 'На неделю', 'На будущее']}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
            },
          }}
          renderInput={(params) => <TextField {...params} label="По дате завершения" />}
        />

        <Autocomplete
          disablePortal
          value={responsibleFilter}
          onChange={(_, newValue) => setResponsibleFilter(newValue)}
          options={['Захар', 'Алина', 'Иван', 'Мария', 'Никита', 'Ольга']}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
            },
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ color: 'white' }} label="По ответственным" />
          )}
        />

        <Button onClick={handleClear} sx={{ color: 'black', '&:focus': { outline: 'none' } }}>
          Очистить
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .map((task, index) => (
              <TaskCard
                key={index}
                title={task.title}
                priority={task.priority}
                dueDate={task.dueDate}
                responsible={task.responsible}
                status={task.status}
                updatedAt={task.updatedAt}
                onClick={() => {
                  setSelectedTask(task);
                  setModalOpen(true);
                }}
              />
            ))
        ) : (
          <Box sx={{ mt: 2, color: 'gray' }}>Задач не найдено</Box>
        )}
      </Box>

      {modalOpen && <Modal task={selectedTask} setTasks={setTasks} open={modalOpen} setModalOpen={setModalOpen} setSelectedTask={setSelectedTask} />}
    </Box>
  );
};

export default TasksPageByRole;
