import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "../../Widget/Card";
import User from "../User";
import UserService from "./UserService";

export const UserList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {
    UserService.getUsers()
      .then((res) => {
        props.SetUsers(res.users);
        setUsers(res.users)
        setAllUsers(res.users)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  },[]);
  

  const searchUser = (evt) => {
   let newUsers = [...allUsers]

   newUsers = newUsers.filter((user)=>{
     return user.name.toUpperCase().includes(evt.target.value.toUpperCase())

   });
   setUsers(newUsers) 
  }



  return (
    <Card>
      <div className="card-body">
        <h4 className="text-center">All Users</h4>
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-primary">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {
          users && 
          <div class="form-group">
          <input  onChange ={(evt)=>searchUser(evt)} type="text" className="form-control" id="users"  placeholder="Search User..."/>
        </div>
      
        }
        {users &&

          users.map((user) => {
            return <User key={user.id} data={user} />;
          })}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SetUsers: (data) => dispatch({ type: "USERS", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
