import $api from '../http/index'

class TaskService {
    getAllTasks = async () => {
        try {
            const response = await $api.get('api/tasks');
            // console.log('tasks', response.data)
            return response.data;
        } catch (error: any) {

          return error.response.data.message;

        }
    };

    // getTasksById = async () => {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

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
            console.log('работает')
            
            const response = await $api.put(`api/tasks/${id}`, taskUpdateData)
            return response.data;

        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }
}

export default TaskService