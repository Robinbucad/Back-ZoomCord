
import crypto from 'crypto'


const salt= 'demo_secret_bootcamp';
// ESTO DEVUELVE UNA PASS CODIFICADA
export const encodePassword = (pass) => {
    // utilizamos la librería crypto para codificarla haciendo uso de 1000 iteraciiones
    return crypto.pbkdf2Sync(pass, salt,1000, 64, `sha512`).toString(`hex`);
}


export const generateValidationToken = () => {
    return crypto.randomBytes(128).toString(`hex`)
}

