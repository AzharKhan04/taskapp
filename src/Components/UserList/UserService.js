import Fetch from '../../Services/Fetch';
import API from '../../Constants';

const UserService = {

    getUsers: () => {
      const fetch = new Fetch();
      const url = API.LISTUSERS;
      return fetch.get(url);    

    }
}
export default UserService;
