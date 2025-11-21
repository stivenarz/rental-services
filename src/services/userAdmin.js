import toast from "react-hot-toast";
import apiService from "./apiService";

/**
 * Función que valida si existe el usuario admin en la base de datos y si no existe crea el usuario
 */
export const userAdminValidation = () => {
    const admin = {
        name: "Karol G",
        phone: "3006586484",
        address: "Cra 42 39C 23",
        email: 'kgcarrillo10@gmail.com',
        password: 'totumito',
        role: "admin"
    }
    apiService.getAll('users')
        .then(res => {
            const userAdmin = res.filter(u => u.email == 'kgcarrillo10@gmail.com')
            if (!userAdmin.length) {
                apiService.post('users/', admin)
                    .then(user => {
                        // toast.success('se creó el usuario admin correctamente')
                    })
                    .catch(error => toast.error(`Error: ${error.detail}`))
            } else {
                // toast.error('no se pudo crear el usuario admin')
            }
        })
        .catch(error=> {
            // toast.error('no se pudo obtener los usuarios')
        })
}