import {ref, computed} from "vue";
import {defineStore} from "pinia";
import {isValidEmail, isValidPassword} from "../utils/auth"

export const useAuthStore = defineStore("auth", () => {
    const user = ref({});
    const isAuth = computed(() => user.value.name !== undefined);

    const logIn = (email, password) => {
        const verifiedCredentials = validateCredentials(email, password);
        if (verifiedCredentials.hasError === true) {

        }
        user.value = {
            email: email
        }
    }
    /*This is a dummy funcion, it should be a call to the server
    * verifying the credentials and returning any kind of auth
    * credentials (api token, session id etc)*/

    const validateCredentials = (email, password) => {

        const isAValidEmail = isValidEmail(email)
        if (isAValidEmail === false) {
            return {error: 'The email should be a valid email', field: 'email', hasError: true};
        }
        const isPasswordOk = isValidPassword(password);

        if (isPasswordOk === false) {
            return {
                error: 'The password should have at least 6 characters and contain lower and uppercase letters, numbers and simbols',
                field: 'password',
                hasError: true
            };
        }
        return {
            hasError: false
        }
    }


    return {user, isAuth, logIn};
});
