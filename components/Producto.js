import Image from "next/image"
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

export default function Producto( { producto } ){
    // Destructura del producto
    const { nombre, imagen, precio } = producto;

    // Sacar el seteador del producto
    const { handleSetProducto, handleChangeSetModal } = useQuiosco();

    return(
        <div className="border p-3">
            <Image 
                src={`/assets/img/${imagen}.jpg`}
                alt={`imagen platillo ${imagen}`}
                width={400}
                height={500}
            />
            <div className="p-5">
                <h3 className="text-2xl">{nombre}</h3>
                <p className="mt-5 font-black text-amber-500 text-4xl">
                    { formatearDinero(precio) }
                </p>
                <button 
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-4 p-3 uppercase font-bold"
                    onClick={() => {
                        handleSetProducto(producto);
                        handleChangeSetModal();
                    }}
                >
                        Agregar
                </button>
            </div>
        </div>
    )
}