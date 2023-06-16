// con un context se puede pasar datos a todos los componentes y no estar importando muchas veces
import { useRouter } from 'next/router'
import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    // States globales
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ producto, setProducto ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ pedido, setPedido ] = useState([]);
    const [ total, setTotal ] = useState(0);

    // En la pagina de total
    const [ nombre, setNombre ] = useState('');

    // Declarar el router
    const router = useRouter();

    // Funcion para obtener todas las categorias desde la API
    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data.categorias);
    }

    // Effect para obtener las categorias una sola vez y effect para setear una categoria default
    useEffect(() => {
        obtenerCategorias();
    }, [])

    useEffect(() => {
        setCategoriaActual( categorias[0] )
    }, [ categorias ])

    // Effect para recalcular el total
    useEffect(() => {
        const nuevoTotal = pedido.reduce( ( total, producto ) => ( producto.precio * producto.cantidad ) + total, 0);
        setTotal( nuevoTotal );
    }, [ pedido ])

    // Para obtener los productos de la categoria seleccionada
    const handleClickCategoria = ( id ) => {
        const categoria = categorias.filter( cat => cat.id === id );
        setCategoriaActual( categoria[0] );

        //Emoujar al usuario al menu sin importar en que pagina este
        router.push('/')
    }

    // Agregar un producto al modal
    const handleSetProducto = ( producto ) => {
        setProducto( producto );
    }

    // Oculta o muestra el modal
    const handleChangeSetModal = () => {
        setModal( !modal );
    }

    // Se hace destrucura del producto para sacar categoriaId e imagen y no tenerlo en el pedido
    const handleAgregarPedido = ( { categoriaId, ...producto } ) => {
        // Si el producto ya existe (sime devuelve true o false)
        if( pedido.some( productoState => productoState.id === producto.id ) ){
            // Actualizar pedido

            // Devuelve un array con el producto ya reemplazado y mantiene los originales
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState );
            setPedido( pedidoActualizado );

            // Mostrar notificacion de Toastify
            toast.success('Pedido editado');
        } else {
            setPedido( [ ...pedido, producto ] );

            // Mostrar notificacion de Toastify
            toast.success('Pedido agregado');
        }
        
        // Desactiva el modal
        setModal( false );
    }

    const handleEditarCantidades = ( id )  => {
        // Se extrae el producto con el metodo fulter por medio del id del producto
        const productoActualizar = pedido.filter( producto => producto.id === id );

        // Cuando se encuentre entra el state de producto para reemplazar el ultimo producto visto y se activa el modal
        setProducto( productoActualizar[0] )
        setModal( !modal );
    }

    const handleEliminarProducto = ( id ) => {
        // Se extrae el producto con el metodo fulter por medio del id del producto
        const pedidoActualizado = pedido.filter( producto => producto.id !== id );

        // Cuando se encuentre entra el state de pedidos para reemplazar el ultimo producto visto y se activa el modal
        setPedido( pedidoActualizado );
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        
        // Pasando los datos a Axios
        try {
            await axios.post('/api/ordenes',
            {
                pedido,
                nombre,
                total,
                fecha: Date.now().toString()
            })

            // Resetear App
            setCategoriaActual( categorias[0] );
            setPedido([]);
            setNombre('');
            setTotal(0);

            // Informa al usuario el esatdo de su pedido y es llevado a la pagina principal despues de un 3s
            toast.success('Pedido Realizado Correctamente');
            setTimeout(() => { router.push('/') }, 3000)
        } catch (error) { console.log(error) }
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeSetModal,
                pedido,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            { children }
        </QuioscoContext.Provider>
    )
}

export { QuioscoProvider }
export default QuioscoContext