import { useState, useEffect } from "react";
import photosId from "../../../helper/calendarCarrouselPhotosData";
import getPhoto from "../../../api/unsplash/getPhoto";
export default function usePhotosCalendarCarrousel(){
    const [photos , setPhotos] = useState<Array<Object> | Error | null>(null);
    useEffect(() => {
        const arrayOfPhotos : Object[] = []
        photosId.forEach(async o => {
            const data = await getPhoto(o.id)
            arrayOfPhotos.push(data)
        })
        setPhotos(arrayOfPhotos)
    },[])
    return photos
}