import React from 'react'
import { Month } from '../../../../types/Month'
export const Calendar = ({month} : {month:Month | null}) => {
  if(month !== null){
      return (
        <div className='flex flex-col items-center sm:items-start sm:p-6'>
            <div>

            </div>
            <h1 className='font-semibold text-3xl'>
                {month.monthName} {month.year}
            </h1>
            <table className='border-spacing-x-0.5'>
                <thead>
                    <tr className=''>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                {
                    month.days.map(days => {
                        return(
                            <tr >
                                {days.map(day => {
                                    return(
                                        <td>
                                            {day}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
              
            </table>
        </div>
      )
  } else {
      return (
          <h1>
              Loading...
          </h1>
      )
  }
    
}
