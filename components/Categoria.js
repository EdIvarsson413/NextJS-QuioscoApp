import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

export default function Categoria( { categoria } ) {
    const { id, nombre, icono } = categoria; // Arreglo obtenido de Sidebar.js
    const { categoriaActual, handleClickCategoria } = useQuiosco();

    return(
        <div 
            className={`${ categoriaActual?.id === id ? 'bg-amber-400' : ''} 
                        flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
        > {/* eslint-disable-next-line */}
            <Image
                width={65}
                height={65}
                src={`/assets/img/icono_${icono}.svg`} // icono es el nombre del archivo que se encuentra en este proyecto
                alt="Imagen icono"
            />

            {/* El boton muestra las productos que hay en cada categoria */}
            <button 
                type="button" 
                className="text-2xl font-bold hover:cursor-pointer"
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
        </div>
    )
}