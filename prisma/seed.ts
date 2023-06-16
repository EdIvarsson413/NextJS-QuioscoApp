import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

// Con la instancia de Prisma CLient se puede hacet todo tipo de operaciones en la base de datos
const prisma = new PrismaClient();

const main = async () : Promise<void> => {
    try {
        // CreateMany permite darle a las tablas muhcos renglones, en este caso, pasamos los arreglos de TS
        await prisma.categoria.createMany({ data: categorias });
        await prisma.producto.createMany({ data: productos });
    } catch (error) {
        console.log(error)
    }
}

main();