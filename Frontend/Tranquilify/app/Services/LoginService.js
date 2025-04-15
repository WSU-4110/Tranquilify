import axios from 'axios';

const API_URL =  `http://172.20.10.2:9191/api/login`;

const USER_URL = `http://172.20.10.2:9191/api/users`;

console.log(API_URL);

export const CheckEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if( email === '' ) return 'Error: Please enter both email and password';

    else if(!emailRegex.test(email)) return 'Error: Enter a valid email address.';

    else return true;
};

export const CheckPassword = (password) => {

    if(password === '') return 'Error: Please enter both email and password' ;

    return true;
};

export const validateInputs = (email, password, firstName, lastName) => {

    if (!email || !password || !firstName || !lastName)  return 'Error: All fields are required.';

    if ( CheckEmail(email) !== true) return CheckEmail(email);

    if (password.length < 6)  return 'Error: Password must be at least 6 characters.';

    return true;
};

export const Login = async (email, password) =>{
    
    if ( CheckEmail(email) !== true) return CheckEmail(email);
    
    else if( CheckPassword(password) !== true ) return CheckPassword(password);
    
    try{
        
        const response = await axios.post(`${API_URL}/sign_in`, { email, password } );
        
        return response.data;
    }
        
    catch(error) {
            
        return `Error: login failed, ${error.response.data || 'Sonething went wrong'}`;
    }
};

export const SignUp = async (email, password, firstName, lastName) => {

    const valid = validateInputs(email, password, firstName, lastName);

    if( valid !== true ) return valid;

    try {
    
        console.log('signing up with: ', API_URL);
        const response = await axios.post(`${API_URL}/sign_up`, { email, password, firstName, lastName });
    
        return response.data;
    
    } catch (error) {
    
        console.log(error);
        return `Error: Signup Failed,  ${error.response.data || 'Something went wrong. Please try again.'}`;
    }
};

export const getUser = async(userToken) => {

    try{

        const response = await axios.get(`${USER_URL}/`, {headers: { "Authorization": `Bearer ${userToken}` }} );

        return response.data;
    }
    catch(error){

        return `Error: Cannot retrieve user details`;
    }
}