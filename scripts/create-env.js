const fs = require("fs");//se requiere el filesystem

fs.writeFileSync("./.env", `API=${process.env.API}\n`)//la forma como se va poblar el archivo, esto sera en el servidro