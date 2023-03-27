import axios from 'axios'
export default async function getPhoto(photoId: string, key? : string, secret_key? : string) : Promise<object | Error>{
    const UNSPLASH_KEY = key? key: process.env.UNSPLASH_KEY
    const UNSPLASH_SECRET_KEY = secret_key? secret_key : process.env.UNSPLASH_SECRET_KEY
    const URL = `https://api.unsplash.com/photos/${photoId}/?client_id=${UNSPLASH_KEY}`;
    try {
        const response = await axios.get(URL)
        console.log(response)
    } catch (error : any){
        throw Error(error)
    }
    return {}
}