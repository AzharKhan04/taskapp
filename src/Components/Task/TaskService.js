import Fetch from '../../Services/Fetch';
import API from '../../Constants';

const TaskService = {

    addTask : (data) => {

        const fetch = new Fetch();
        const url = API.ADDTASK;
        return fetch.post(url,data);    
    },

    updateTask : (data) => {

        const fetch = new Fetch();
        const url = API.UPDATETASK;
        return fetch.post(url,data);    

    },
    deleteTask : (data) => {
        const fetch =  new Fetch()
        const url = API.DELETETASK;
        return fetch.post(`${url}`,data);    
    }
}

export default TaskService;