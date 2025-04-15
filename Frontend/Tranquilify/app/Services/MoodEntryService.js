import axios from "axios"
import moment from "moment"

const API_URL =  `http://172.20.10.2:9191/api/mood`;

const ANALYTICS_URL =  `http://172.20.10.2:9191/api/analytics`;

export const dateFormatter = (date) => {
    
    const jsDate = moment(date).toDate();

    return jsDate.getTime();
};

const sortData = (moodData) => {

    const sortedData = [...moodData].sort( (a, b) => dateFormatter(a.date) - dateFormatter(b.date) );

    return sortedData.map(item => ({
        ...item,
        formattedDate: moment(item.date).format('MMM D'), // e.g., "Apr 15"
    }));
}


export const checkTodaysMoodEntry = (entries) => {
    if (!entries || entries.length === 0) return false;
    
    const today = moment().format('YYYY-MM-DD');
    return entries.some(entry => {
        const entryDate = moment(entry.date).format('YYYY-MM-DD');
        return entryDate === today;
    });
};

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

export const moodState = async (userToken) => {

    try{

        const response = await axios.get(`${ANALYTICS_URL}/`, {headers: { "Authorization": `Bearer ${userToken}` } });

        return response.data;
    }
    catch(error){

        return `Error, ${error.response?.data?.message || "Failed to save note"}`;

    }
};