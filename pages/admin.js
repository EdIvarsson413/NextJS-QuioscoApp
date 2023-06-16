import useSWR from "swr"
import axios from "axios"
import AdminLayout from "@/layout/AdminLayout"
import Orden from "@/components/Orden";

export default function Admin(){
    // fetcher e sun afuncion que SWR debe ejecutar ya que no consulta a al API por si solo
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data);

    // data son los datos que se obtienen de la peticion a la API
    // error por si puede ocurrir un problema y debuggearlo
    // isLoading puede usarse cuando se estan cargando datos (por defecto es true)
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 5 });


    // refreshInterval : 5
    // se usa para evitar una recarga de la pagina y en su lugar agrega reactividad en tiempo real
    // en este caso cuando se cumple una orden, se vuelve a consultar a la API despues de 5 milisegundos


    return(
        <AdminLayout pagina={"Admin"}>
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>

            {
                data && data.length ? 
                    data.map( orden => (<Orden key={orden.id} orden={orden}/>))
                    :   
                    (<p>No hay ordenes pendientes</p>)
            }
        </AdminLayout>
    )
}