import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {isValidEmail, isValidPassword} from "../helpers/auth"

export const useAuthStore = defineStore("auth", () => {

    const auth = ref({user: {}, error: {}});
    const isAuth = computed(() => auth.value.user.email !== undefined);

    const login = (email, password) => {
        validateCredentials(email, password);
        if (auth.value.error.hasError) {
            return;
        }
        auth.value.user = {
            email: email
        }
    }

    const logout = () => {
        auth.value = {user: {}, error: {}};
    }

    const validateCredentials = (email, password) => {

        const isAValidEmail = isValidEmail(email)
        if (isAValidEmail === false) {
            auth.value.error = {message: 'The email should be a valid email', field: 'email', hasError: true};
            return;
        }
        const isPasswordOk = isValidPassword(password);

        if (isPasswordOk === false) {
            auth.value.error = {
                message: 'The password should have at least 6 characters and contain lower and uppercase letters, numbers and symbols',
                field: 'password',
                hasError: true
            };
            return;
        }
        //Both validations are ok, remove any older error from auth object.
        auth.value.error = {};
    }


    return {auth, isAuth, login, logout};
}, {
    persist: {
        paths: ['auth.user']
    }
});
