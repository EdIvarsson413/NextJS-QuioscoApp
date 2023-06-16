// Este archivo funciona como un controlador en un proyecto de Express que este 
// interactuando con una base de datos
// NO SE PUEDE CONSULTAR A UNA BASE DE DATOS DESDE EL CLIENTE, SOLO EN ESTOS ENDPOINTS O CON getServerSideProps
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  // Con include se pueden traer las categorias pero tambien los productos relacionados 
  // a esa categoria
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true
    }
  });

  res.status(200).json({ categorias })
}
