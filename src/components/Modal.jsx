import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')


    useEffect(() => {
        //gastoEditar
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCategoria(gastoEditar.categoria)
            setCantidad(gastoEditar.cantidad)
            setMensaje(gastoEditar.mensaje)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])
    
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if ([nombre, cantidad,categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3500)
            return;
        }else {
            guardarGasto({nombre, cantidad, categoria, id,fecha})
        }
    }
    

    return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt='Cerrar Modal'
                onClick={ocultarModal}    
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            <div className='campo'>
                <label htmlFor='nombre'>Nombre Gasto</label>
                {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}
                <input 
                    id='nombre'
                    type='text'
                    placeholder='Agrega el nombre del gasto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input 
                    id='cantidad'
                    type='number'
                    placeholder='Agrega cantidad del gasto'
                    value={cantidad}
                    onChange={ e => Number(setCantidad(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select
                    id='categoria'
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value)}
                >
                    <option value=''>Seleccione</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='varios'>Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>

                </select>
            </div>

            <input 
                type='submit'
                value={gastoEditar.nombre ? "Editar Gasto" : "Guardar Cambios"}
            />
        </form>
    </div>
  )
}

export default Modal