import { PrismaClient } from "@prisma/client"

// Agregando routing dinamico
export default async function handler( req, res) {
    const primsa = new PrismaClient();

    if( req.method === 'POST' ) {
        const { id } = req.query
        
        // Editando una orden, primero se usa where y luego se pasa lo que se va a cambiar en el registro
        const ordenActualizada = await primsa.orden.update({
            where: {
                id: parseInt(id),

            },
            data: {
                estado: true
            }
        })
        res.status( 200 ).json(ordenActualizada);
    }
}