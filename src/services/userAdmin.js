import toast from "react-hot-toast";
import apiService from "./apiService";

/**
 * Función que valida si existe el usuario admin en la base de datos y si no existe crea el usuario
 */
export const userAdminValidation = () => {
    const admin = JSON.parse(import.meta.env.VITE_ADMIN || null);
    if (!admin) return
    
    apiService.getAll('users')
        .then(res => {
            const userAdmin = res.filter(u => u.email == admin.email)
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