import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { format } from 'date-fns';

interface TaskCardProps {
    title: string;
    description: string; 
    priority: string;
    dueDate: Date;
    responsible: string;
    status: string;
    updatedAt: Date;
    onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    title,
    description,
    priority,
    dueDate,
    responsible,
    status,
    updatedAt,
    onClick
}) => {
    return (
        <Card
            variant="outlined"
            sx={{ mb: 2, cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: 3 } }}
            onClick={onClick}
        >
            <CardContent>
                <Typography variant="h6" 
                    sx={{ 
                        color: status === 'выполнена' ? 'green' : 'blcak',
                        fontWeight: status === 'выполнена' ? 'bold' : 'none'
                    }}>
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>

                <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                    <Typography variant="body2"><strong>Приоритет:</strong> {priority}</Typography>
                    <Typography 
                        sx={{
                            color: new Date().setHours(0, 0, 0, 0) > new Date(dueDate).setHours(0, 0, 0, 0) && status !== 'выполнена'
                                ? 'red'
                                : 'black'
                        }}
                        variant="body2"
                    >
                        <strong>Дата окончания:</strong> 
                        {format(new Date(dueDate), 'dd.MM.yyyy')}
                    </Typography>
                    <Typography variant="body2"><strong>Ответственный:</strong> {responsible}</Typography>
                    <Typography variant="body2"><strong>Статус:</strong> {status}</Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                    Последнее обновление: {format(new Date(updatedAt), 'dd.MM.yyyy HH:mm')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
