import React, { useEffect, useState } from 'react'
import photosId from '../../../helper/calendarCarrouselPhotosData';
import getPhoto from '../../../api/unsplash/getPhoto';
import { Button } from '../../../common/Button/Button';
export const CalendarCarrousel = ({photos} : {photos : Object[] | Error | null}) => {0
    const [currentIndex, setCurrentIndex] = useState(0)
    const numberOfMonths = 12
    console.log(photos)
  return (
      <>
        <div className='w-full aspect-[7/13] sm:aspect-[3/5] md:aspect-[12/10] lg:aspect-[15/14] xl:aspect-[5/3] 2xl:aspect-[4/3] shadow-xl rounded-2xl'>
            <div className='w-full  rounded-2xl' style={ {
                  "position": "relative",
                  "width": "100%",
                  "height": "0",
                  "paddingBottom": "56.25%" /* 16:9 Aspect Ratio */
            } 
            }>
                {/* <img style={ {
                      "position": "absolute",
                      "top": "0",
                      "left": "0",
                      "width": "100%",
                      "height": "100%",
                      "objectFit": "cover",
                }} src={photos[0].urls.full} alt="" /> */}
            </div>
        </div>
        <div className='flex space-x-3'>
            <div>
                <Button hover='  hover:shadow-xl' shadow={true}  aStyle='rounded-full' text='Back' border={false} func={() => setCurrentIndex(oldNumber => oldNumber === 0? numberOfMonths - 1: oldNumber - 1)}/>
            </div>
            <div >
                <Button hover='  hover:shadow-xl' shadow={true} aStyle='rounded-full' text='Next'  border={false} func={() => setCurrentIndex(oldNumber => oldNumber === numberOfMonths? 0: oldNumber + 1)}/>
            </div>
        </div>
      </>
 
  )
}
