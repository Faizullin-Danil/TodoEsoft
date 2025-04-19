import { RegistrationData } from '../interfaces/IRegistrationData'
import { ILoginDate } from '../interfaces/ILoginDate'

import $api from '../http/index'

class UserService {
    registration = async (regData: RegistrationData) => {
        try {
            const response = await $api.post('api/registration', regData);
            console.log(response)

            localStorage.setItem('auth', JSON.stringify(response.data));

            return response;
        } catch (error: any) {

          return error.response.data.message;

        }
    };

    login = async (logindData: ILoginDate) => {
        try {
            const response = await $api.post('api/login', logindData)

            localStorage.setItem('auth', JSON.stringify(response.data));

            return response
        } catch (error: any) {
            return error.response.data.message;

        }
    }

    getAllUsers = async () => {
        try {
            const response = await $api.get('api/users')

            // console.log('users', response)

            return response.data
        } catch (error: any) {
            return error.response.data.message;
        }
    }
}

export default UserService