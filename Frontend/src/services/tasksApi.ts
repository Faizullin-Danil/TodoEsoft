import $api from '../http/index'

class TaskService {
    getAllTasks = async () => {
        try {
            const response = await $api.get('api/tasks');
            return response.data;
        } catch (error: any) {

          return error.response.data.message;

        }
    };

    createTask = async (taskData: any) => {
        try {
            const response = await $api.post('api/tasks', taskData);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }
      
    updateTask = async (id: number, taskUpdateData: any) => {
        try {
            const response = await $api.put(`api/tasks/${id}`, taskUpdateData)
            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }
}

export default TaskService