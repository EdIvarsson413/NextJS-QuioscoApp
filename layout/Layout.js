import Sidebar from "@/components/Sidebar"
import Head from "next/head"
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import Pasos from "@/components/Pasos"
import ModalProducto from "@/components/ModalProducto"
import useQuiosco from "@/hooks/useQuiosco"
import 'react-toastify/dist/ReactToastify.css';


// Estilos del modal
const estilosModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: "translate(-50%, -50%)"
    }
}

// Agregar modal
// Modal.setAppElement("#root");  Se agrega al id del div principal de la app (Para Vite)
Modal.setAppElement("#__next"); // Este es el id del div de NextJS

export default function Layout({children, pagina = ''}){
    const { modal } = useQuiosco();

    return(
        <>
            <Head>
                <title>{ pagina }</title>
                <meta name="descripcion" content="Quiosco Cafetería"/>
            </Head>
            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar/>
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        <Pasos />
                        { children }
                    </div>
                </main>
            </div>

            {/* Modal para mostrar el producto y pedir la cantidad */}
            {
                modal && ( 
                    <Modal
                        isOpen={modal}
                        style={estilosModal}
                    >
                        <ModalProducto />
                    </Modal> 
                )
            }

            {/* Notificacion con React Toastify, aqui solo se registra en donde se mostrara */}
            <ToastContainer />
        </>
    )
}