import Image from "next/image"
import { useState, useEffect } from "react";
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers";

// Modal que muestra un producto con React Modal

export default function ModalProducto(){
    const { producto, handleChangeSetModal, pedido ,handleAgregarPedido } = useQuiosco();
    const [ cantidad, setCantidad ] = useState(1); // La cantidad a pedir por default sera 1
    const [ edicion, setEdicion ] = useState(false);

    // Si el modal actual esta en el pedido
    useEffect(() => {
        if( pedido.some( pedidoState => pedidoState.id === producto.id ) ) {
            // Se habilita la edicion del modal
            setEdicion(true);

            // Se extrae el pedido de acuerdo al producto sleccionado
            const productoEdicion = pedido.find( pedidoState => pedidoState.id === producto.id );

            // Se setea la cantidad del pedido que fue realizado
            setCantidad( productoEdicion.cantidad );
        }
    }, [ producto, pedido ])

    return(
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image 
                    width={300}
                    height={400}
                    src={`/assets/img/${producto?.imagen}.jpg`}
                    alt={`imagen producto ${producto?.nombre}`}
                />
            </div>

            <div className="md:w-2/3">
                {/* Iconos de HeroIcons */}
                <div className="flex justify-end">
                    {/* Cerrar modal */}
                    <button onClick={() => handleChangeSetModal()}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-6 h-6"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">{ producto.nombre }</h1>
                <p className="mt-5 font-black text-5xl text-amber-500">{ formatearDinero( producto.precio ) }</p>

                <div className="flex gap-4 mt-5">
                    {/* Boton de menos */}
                    <button 
                        type="button" 
                        onClick={() => {
                            // Limitar el contador para no pedir menos de 1
                            if( cantidad <= 1 ) return;
                            setCantidad( cantidad - 1 );
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-7 h-7"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>

                    {/* Cantidad a pedir */}
                    <p className="text-3xl">{ cantidad }</p>

                    {/* Boton de más */}
                    <button 
                        type="button" 
                        onClick={() => {
                            // Para no pedir mas de 5
                            if( cantidad >= 5  ) return;
                            setCantidad( cantidad + 1 );
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-7 h-7"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>

                <button 
                    type="button" 
                    className="bg-indigo-600 hover:bg-indigo-800 uppercase rounded
                                px-5 py-2 mt-5 text-white font-bold"
                    onClick={() => handleAgregarPedido( { ...producto, cantidad } )}
                >
                    {
                        edicion ? 'Editar pedido' : 'Añadir pedido'
                    }
                </button>
            </div>
        </div>
    )
}