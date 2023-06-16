import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

export default function Sidebar(){
    // Se Saca del context el state de las categorias a este componente
    const { categorias } = useQuiosco()

    return(
        <>
            <Image
                width={250}
                height={100}
                src={"/assets/img/logo.svg"}
                alt="imagen logotipo"
            />

            <nav className="mt-10">
                {   //Se van a mostrar las categorias
                    categorias.map(categoria => (<Categoria key={categoria.id} categoria={categoria}/>))
                }
            </nav>
        </>
    )
}