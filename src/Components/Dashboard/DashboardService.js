import Fetch from '../../Services/Fetch';
import API from '../../Constants';

const DashboardService = {
  getTasks: () => {
    const fetch = new Fetch();
    const url = API.LISTTASKS
    return fetch.get(url);    

  }
};

export default DashboardService;
