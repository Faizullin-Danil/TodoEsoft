import { Autocomplete, Box, Button, TextField } from '@mui/material';
import TaskCard from "../components/TaskCard";
import { useState } from 'react';
import Modal from '../components/Modal';
import { Task } from '../interfaces/ITask';

const users = [
  {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    patronymic: 'Иванович',
    login: 'ivanov',
    password: 'password123',
    role: 'admin', // Роль пользователя: admin или user
  },
  {
    id: 2,
    firstName: 'Алина',
    lastName: 'Петрова',
    // patronymic: 'Александровна',
    login: 'petrova',
    password: 'password456',
    role: 'user', // Роль пользователя
  },
  {
    id: 3,
    firstName: 'Мария',
    lastName: 'Сидорова',
    patronymic: 'Сергеевна',
    login: 'sidorova',
    password: 'password789',
    role: 'user',
  },
];

const arrayTasks = [
  {
    title: 'задача 1',
    description: 'Проверить документацию и подготовить отчёт.',
    priority: 'средний',
    dueDate: new Date(2025, 3, 23),
    responsible: 'Захар',
    status: 'На выполнении',
    updatedAt: new Date(2020, 0, 26)
  },
  {
    title: 'задача 2',
    description: 'Связаться с клиентом и уточнить детали проекта.',
    priority: 'высокий',
    dueDate: new Date(2025, 3, 16),
    responsible: 'Алина',
    status: 'Выполняется',
    updatedAt: new Date(2025, 3, 9)
  },
  {
    title: 'задача 3',
    description: 'Подготовить презентацию для совещания.',
    priority: 'низкий',
    dueDate: new Date(2025, 4, 20),
    responsible: 'Иван',
    status: 'Ожидает',
    updatedAt: new Date(2025, 3, 15)
  },
  {
    title: 'задача 4',
    description: 'Обновить внутренние инструкции по безопасности.',
    priority: 'средний',
    dueDate: new Date(2025, 3, 18),
    responsible: 'Мария',
    status: 'выполняется',
    updatedAt: new Date(2025, 3, 16)
  },
  {
    title: 'задача 5',
    description: 'Завершить отчёт по кварталу и отправить руководству.',
    priority: 'высокий',
    dueDate: new Date(2025, 4, 1),
    responsible: 'Никита',
    status: 'выполнена',
    updatedAt: new Date(2025, 3, 10)
  },
  {
    title: 'задача 6',
    description: 'Отменить устаревшие заказы и уведомить клиентов.',
    priority: 'Низкий',
    dueDate: new Date(2025, 3, 30),
    responsible: 'Ольга',
    status: 'Отменена',
    updatedAt: new Date(2025, 3, 12)
  }
];

const userOptions = users.map(user => ({
  id: user.id,
  fullName: `${user.lastName} ${user.firstName}${user.patronymic ? ` ${user.patronymic}` : ''}`
}));





const TasksPage = () => {
  const role = 'admin'
  const [isRegistered, setIsRegistered] = useState(false)
  const [tasks, setTasks] = useState(arrayTasks)
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [responsibleFilter, setResponsibleFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Инициализируем как null

  // console.log(userOptions)

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
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 850}}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
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

        {role === 'admin' && 
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
        />}
        <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
          <Button onClick={handleClear} sx={{ color: 'black', height: '100%', '&:focus': { outline: 'none' } }}>
            Очистить
          </Button>
          <Button onClick={() => setModalOpen(true)} sx={{ color: 'black', height: '100%', '&:focus': { outline: 'none' } }}>
            Новая задача
          </Button>
        </Box>
        
      </Box>

      <Box sx={{ mt: 1 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()) 
          .map((task, index) => (
            <TaskCard
              key={index}
              description={task.description}
              title={task.title}
              priority={task.priority}
              dueDate={task.dueDate}
              responsible={task.responsible}
              status={task.status}
              updatedAt={task.updatedAt}
              onClick={() => {
                setSelectedTask(task)
                setModalOpen(true);    
              }}
            />
          ))
        ) : (
          <Box sx={{ mt: 2, color: 'gray' }}>Задач не найдено</Box>
        )}
      </Box>

      {modalOpen && 
        <Modal 
          task={selectedTask} 
          users={userOptions}
          setTasks={setTasks} 
          role={role} 
          open={modalOpen} 
          setModalOpen={setModalOpen} 
          setSelectedTask={setSelectedTask} 
        />}
    </Box>
  );
};

export default TasksPage;
