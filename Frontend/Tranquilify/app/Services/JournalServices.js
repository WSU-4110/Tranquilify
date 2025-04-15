import axios from 'axios';
import moment from 'moment'

const API_URL =  `http://172.20.20.20:9191/api/notes`;

//get journal entries
export const getEntry = async (userToken) => {

    try {

        const response = await axios.get(`${API_URL}/`, {headers: { "Authorization": `Bearer ${userToken}` } });

        return response.data;  
    
    } catch (error) {
    
        return `Error", ${error.response?.data || "Failed to load notes"}`;
   } 
};

//add a new journal entry
export const addEntry = async (newEntry, userToken) => {
  
    const content = newEntry.trim();

    if (content === '') return `Error: please add a valid entry`;

    try {
        
        const response = await axios.post(`${API_URL}/add`, { content },  { headers: { "Authorization": `Bearer ${userToken}` } } );

        return `Success : ${response.data}`;
    
    } catch (error) {
    
        return `Error, ${error.response?.data?.message || "Failed to save note"}`;
    }
};

//delete a journal entry
export const deleteEntry = async (noteId, userToken) => {
    
    try {
    
        const response = await axios.post(`${API_URL}/delete`, { id: noteId },  { headers: { "Authorization": `Bearer ${userToken}` } } );
        
        return `Success : ${response.data}`;
    
    } catch (error) {
        
        return `Error, ${error.response?.data?.message || "Failed to delete note"}`;
    }
};

export const dateFormatter = (date) => {
    
    const jsDate = moment(date).toDate();

    const formattedDate = jsDate.toString();

    return formattedDate;
};
