import axios from "axios"
import moment from "moment"
//import { API_URL_ } from '@env'; // will handle this issue later

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/mood`;

export const dateFormatter = (date) => {
    
    const jsDate = moment(date).toDate();

    return jsDate.getTime();
};

const sortData = (moodData) => {

    const sortedData = [...moodData].sort( (a, b) => dateFormatter(a.date) - dateFormatter(b.date) );

    return sortedData;
}

export const getMoodEntries = async(userToken) => {

    try{

        const response = await axios.get(`${API_URL}/`, {headers: { "Authorization": `Bearer ${userToken}` } });

        const sortedData = sortData(response.data);

        return sortedData; 
    }
    catch(error){

        return `Error, ${error.response?.data?.message || "Failed to load moods"}`;
    }
}

export const addMoodEntry = async (value, userToken) => {

    try{

        const response = await axios.post(`${API_URL}/add`, { value },  { headers: { "Authorization": `Bearer ${userToken}` } } );

        return `Success : ${response.data}`;
    }
    catch(error){

        return `Error, ${error.response?.data?.message || "Failed to save note"}`;

    }
};