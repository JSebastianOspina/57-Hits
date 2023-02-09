const isValidEmail = (email) => {
    const emailRegExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExpression.test(email);
}

const isValidPassword = (password) => {
    return /[A-Z]/.test(password) && //Uppercase
        /[a-z]/.test(password) && // lowerCase
        /[0-9]/.test(password) && //Numbers
        /[^A-Za-z0-9]/.test(password) && //Simbols
        password.length > 6; //at least 6 characters
}

export {isValidEmail, isValidPassword};