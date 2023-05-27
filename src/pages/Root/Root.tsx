import React, { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export default function Root () {
    return (
        <div>
            Root
        </div>
    )
}
export const rootLoader = () => {
    return redirect("/tasks")
}