import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './components/Navbar'
import UserList from './components/UserList'
import Form from './components/Form'
import './index.css'

function App() {

  
  const [user, setuser] = useState({
    nombres: '',
    apellidos: '',
    edad: 0
  })

  const [users, setusers] = useState([])

  const [listUpdated, setlistUpdated] = useState(false)

  useEffect(() => {
    const getUsers = () => {
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setusers(res))  
    }
    getUsers()
    setlistUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Users App'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h3 style={{textAlign: 'center'}}>Lista de Usuarios</h3>
            <UserList user={user} setuser={setuser} users={users} setlistUpdated={setlistUpdated}/>
          </div>
          <div className="col-5">
            <h3 style={{textAlign: 'center'}}>Agregar Usuario</h3>
            <Form user={user} setuser={setuser} setlistUpdated={setlistUpdated}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
