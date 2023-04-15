import axios from 'axios'
export default async function getPhoto(photoId: string, key? : string, secret_key? : string) : Promise<object | Error>{
    const UNSPLASH_KEY = key? key: import.meta.env.VITE_UNSPLASH_KEY
    console.log(photoId)
    const UNSPLASH_SECRET_KEY = secret_key? secret_key : import.meta.env.VITE_UNSPLASH_SECRET_KEY
    const URL = `https://api.unsplash.com/photos/eijAqFCzoMY?client_id=${UNSPLASH_KEY}`;
    try {
        const response = await axios.get(URL)
        console.log(response)
        return response.data
    } catch (error : any){
        throw Error(error)
    }
}