import React from 'react'

const Form = ({user, setuser, setlistUpdated}) => {

    const handleChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    let{nombres, apellidos, edad} = user

    const handleSubmit = () => {
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
        //Creando la consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        fetch('http://localhost:9000/api', requestInit)
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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombres" className="form-label">Nombres</label>
                <input value={nombres} name="nombres" onChange={handleChange} type="text" id="nombres"className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input value={apellidos} name="apellidos" onChange={handleChange} type="text" id="apellidos"className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edad" className="form-label">Edad</label>
                <input value={edad} name="edad" onChange={handleChange} type="number" id="edad"className="form-control"/>
            </div>
            <button type="submit" className="btn btn-outline-success">Enviar</button>
        </form>
    );
}

export default Form;