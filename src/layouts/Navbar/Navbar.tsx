import React from 'react'
export const Navbar = (children:React.Component) => {
  return (
    <nav className='bg-transparent w-screen'>
        <div>
            LOGO
        </div>
        <div>
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Tasks
                </li>
                <li>
                    About
                </li>
            </ul>
        </div>
    </nav>
  )
}
