import React, {useState} from 'react'
import userList from './data.js';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {

  const [users, setUsers] = useState(userList);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }

  const deleteUser = id => {
     setUsers(users.filter(user => user.id !== id));
  }

  const [editing, setEditing] = useState(false);

  const initialUser = {id: null, name: '', username: ''};

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  }

  const updateUser = (newUser) => {
    setUsers(users.map(user => (user.id === currentUser.id ? newUser : user)))
  }

  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>
      <div className="row">
        <div className="five columns">
          { editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm 
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="seven columns">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
        </div>
      </div>
    </div>
  )
}

export default App