import React from 'react'

const UserList = ({user, setuser, users, setlistUpdated}) => {

    const handleDelete = (id) => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setlistUpdated(true)
    }

    let{nombres, apellidos, edad} = user

    const handleUpdate = (id) => {
        edad = parseInt(edad, 10)
        //Validación de los datos
        if (nombres === '' || apellidos === '') {
            alert('Todos los campos son obligatorios')
            return
        }
        else if (edad <= 0) {
            alert('Ingrese una edad correcta')
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //Reiniciando State
        setuser({
            nombres: '',
            apellidos: '',
            edad: 0
        })
        setlistUpdated(true)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nombres}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.edad}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Eliminar</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(user.id)} className="btn btn-info">Editar</button>
                            </div>
                        </td>
                    </tr>
                ))}  
            </tbody>
        </table>
    )
}

export default UserList;

