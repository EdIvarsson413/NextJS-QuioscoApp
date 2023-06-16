import Image from "next/image"
import axios from "axios"
import { toast } from "react-toastify"
import { formatearDinero } from "@/helpers";

export default function Orden( { orden } ){
    const { id, nombre, total, pedido } = orden;
    
    // Accion del boton de completar orden
    const terminarOrden = async () => {
        try {
            await axios.post(`api/ordenes/${id}`);
            toast.success('Orden despachada');
        } catch (error) { toast.error('Hubo un error') }
    }

    return(
        // Agrupar ordenes
        <div className="border p-10 space-y-5">
            <h3 className="text-2xl font-black">Orden: { id }</h3>
            <p className="text-lg font-bold">Cliente: { nombre }</p>

            <div>
                {   // Muestra los pedidos del cliente
                    pedido.map( platillo => (
                        <div key={platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                            <div className="w-32">
                                <Image 
                                    width={400}
                                    height={500}
                                    src={`/assets/img/${platillo.imagen}.jpg`}
                                    alt={`imagen platillo ${platillo.imagen}`}
                                />
                            </div>

                            <div className="p-5 space-y-2">
                                <h4 className="text-xl font-bold text-amber-500">{ platillo.nombre }</h4>
                                <p className="text-lg font-bold">Cantidad: { platillo.cantidad }</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Muestra el total */}
            <div className="md:flex md:items-center md:justify-between">
                <p className="mt-5 font-black text-4xl text-amber-500">
                    Total a pagar: { formatearDinero( total ) }
                </p>

                <button 
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold 
                                mt-5 md:mt-0 py-3 px-10 uppercase rounded-lg"
                    type="button"
                    onClick={terminarOrden}
                >
                    Completar orden
                </button>
            </div>
        </div>
    )
}