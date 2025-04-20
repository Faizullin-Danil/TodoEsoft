import { Autocomplete, Box, Button, TextField } from '@mui/material';
import TaskCard from "../components/TaskCard";
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';
import { Task } from '../interfaces/ITask';
import { User } from '../interfaces/IUser';
import UserService from '../services/usersApi';
import TaskService from '../services/tasksApi';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const taskService = new TaskService();
const userService = new UserService();

const TasksPage = () => {
  const [role, setRole] = useState<string>('')
  const [tasks, setTasks] = useState<Task[] | null>()
  const [users, setUsers] = useState<User[]>([]); 
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [responsibleFilter, setResponsibleFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { setAuth } = useAuth();

  const storage = JSON.parse(localStorage.getItem('auth')!) as { token: string };
  const userData = jwtDecode<{ id: string; role: string }>(storage.token);

  useEffect(() => {
    setAuth(true)
    const getInfoFromServer = async () => {

      
      setRole(userData.role)

      const allTasks = await taskService.getAllTasks()
      setTasks(allTasks)

      const allUsers = await userService.getAllUsers()
      setUsers(allUsers)
    };

    getInfoFromServer();

  }, []);    
  
  const handleClear = () => {
    setDateFilter(null);
    setResponsibleFilter(null);
  };

  const onToday = new Date();
  const onWeek = new Date();
  onWeek.setDate(onWeek.getDate() + 7);  

  let tasksByRole: Task[] = [];

  if (role === 'Пользователь') {
    tasksByRole = tasks?.filter((task) => task.responsible_id === userData.id) || [];
  } else {
    tasksByRole = tasks || [];
  }
  

  const filteredTasks = tasksByRole?.filter((task: Task) => {
    if (!tasks) return [];
    
    const due = new Date(task.due_date);
  
    const matchesDate =
      !dateFilter ||
      (dateFilter === 'На сегодня' && due.toDateString() === onToday.toDateString()) ||
      (dateFilter === 'На неделю' && due > onToday && due <= onWeek) ||
      (dateFilter === 'На будущее' && due > onWeek);
  
      const fullResponsible = `${task.responsible_lastname} ${task.responsible_name} ${task.responsible_patronymic}`;
      const matchesResponsible = !responsibleFilter || fullResponsible.toLowerCase().includes(responsibleFilter.toLowerCase());
        
    return matchesDate && matchesResponsible;
  }) || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 900}}>
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

        {role === 'Руководитель' && 
          <Autocomplete
            disablePortal
            value={responsibleFilter}
            onChange={(_, newValue) => setResponsibleFilter(newValue)}
            options={users.map(user => `${user.lastname} ${user.name} ${user.patronymic}`)}
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ color: 'white' }} label="По ответственным" />
            )}
          />
        }
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
          .sort((a, b) => new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime())
          .map((task, index) => (
            <TaskCard
              key={index}
              description={task.description}
              title={task.title}
              priority={task.priority}
              dueDate={task.due_date}
              responsible={[task.responsible_lastname, task.responsible_name, task.responsible_patronymic].filter(Boolean).join(' ')}
              status={task.status}
              updatedAt={task.updated_date}
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
          id={userData.id}
          task={selectedTask} 
          users={users}
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
