import React, { useEffect, useState } from 'react'
import photosId from '../../../../helper/calendarCarrouselPhotosData';
import getPhoto from '../../../../api/unsplash/getPhoto';
import { Button } from '../../../../common/Button/Button';
import { JsonCalendar } from 'json-calendar';
import { Calendar } from './Calendar';
export interface Month {
 monthName : string,
 year: number,
 days: number[][]
}
export const CalendarCarrouselContainer = ({photos} : {photos : Object[]}) => {
    const [currentMonth , setCurrentMonth] = useState<Month | null>(null)
    useEffect(() => {
        const currentDate = new Date()
        const calendar = new JsonCalendar()
        let currentMonth : Month = {
            days: calendar.weeks.map(w => w.map(d => d.day)),
            year: currentDate.getFullYear(),
            monthName: calendar.getMonthName(currentDate.getMonth()) 
        };
        console.log(currentMonth)
        setCurrentMonth(currentMonth)
    },[])
    return (
        <>
            <div className='w-full aspect-[7/13] sm:aspect-[3/5] md:aspect-[12/10] lg:aspect-[15/14] xl:aspect-[5/3] 2xl:aspect-[4/3] shadow-xl rounded-2xl'>
                <div className='w-full  rounded-2xl' style={ {
                    "position": "relative",
                    "width": "100%",
                    "height": "100%",
                } 
                }>
                    <Calendar  month={currentMonth}/>
                </div>
            </div>
        </>
    
    )
}
