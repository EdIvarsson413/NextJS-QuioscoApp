import { PrismaClient } from "@prisma/client"

export default async function handler( req, res ) {
    // Importar el cliente de prisma para tener acceso a todos los metodos
    const prisma = new PrismaClient();

    // Destructura del body para mejor organizacion
    const { nombre, total, pedido, fecha } = req.body;

    // Peticion GET para obtener las ordenes que no han sido completadas
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    res.status( 200 ).json(ordenes)

    // Para agregar el soporte para peticion POST
    if( req.method === 'POST' ) {
        const orden = await prisma.orden.create({
            data: {
                nombre,
                fecha,
                total,
                pedido
            }
        })
        res.json(orden)
    }
}