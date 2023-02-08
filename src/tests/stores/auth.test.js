import {setActivePinia, createPinia} from 'pinia'
import {useAuthStore} from "@/stores/auth";

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('getAlbums should login when valid credentials are provided', () => {
        const authStore = useAuthStore();
        //The user is inAuthenticated, isAuth var should be false
        expect(authStore.isAuth).toBe(false);

        const email = 'pleaseHireMe@57blocks.com';
        const password = 'ForSur3!'
        authStore.login(email, password);

        //The user is inAuthenticated, isAuth should be true
        expect(authStore.isAuth).toBe(true);
    });

    test('should NOT login when INVALID credentials are provided', () => {
        const authStore = useAuthStore();
        //The user is inAuthenticated, isAuth should be false
        expect(authStore.isAuth).toBe(false);

        const email = 'pleaseHireMe@57blocks.com';
        const notSecurePassword = 'iwonthireyou:('
        authStore.login(email, notSecurePassword);

        //Will still be false, since the credentials were wrong.
        expect(authStore.isAuth).toBe(false);

    });

    test('should modify error object when an invalid email is provided', () => {
        const authStore = useAuthStore();

        const notValidEmail = 'imNot@AnEmail';
        const anyPassword = '123456789'
        authStore.login(notValidEmail, anyPassword);

        expect(authStore.auth.error).toEqual(
            {
                message: expect.any(String),
                field: 'email',
                hasError: true
            });

    });

    test('should modify error object when an invalid password is provided', () => {
        const authStore = useAuthStore();

        const validEmail = 'pleaseHireMe@57blocks.com';
        const notSecurePassword = '123456789'

        authStore.login(validEmail, notSecurePassword);

        expect(authStore.auth.error).toEqual(
            {
                message: expect.any(String),
                field: 'password',
                hasError: true
            });

    });

    test('should logout and clear state', () => {
        const authStore = useAuthStore();

        //simulate the store state as if a previous user has already logged in
        authStore.auth.user = {
            email: 'pleaseHireMe@57blocks.com'
        }
        //The user is inAuthenticated, isAuth should be true
        expect(authStore.isAuth).toBe(true);

        //log the user out
        authStore.logout();
        expect(authStore.isAuth).toBe(false);
        expect(authStore.auth).toEqual({user: {}, error: {}});

    });
});