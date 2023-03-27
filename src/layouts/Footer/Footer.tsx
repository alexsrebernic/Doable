import React from 'react'
import paths from '../../helper/routesPaths'
import { Link } from '../../common/Link'
import {BsFillSuitHeartFill} from 'react-icons/bs'
const Footer = () => {
  return (
    <footer className='min-h-[5em]  bg-white shadow-xl font-montserrat'>
        <div className='flex flex-col h-full items-center justify-between pt-3 max-w-screen-xl px-4 lg:px-8 xl:px-0  mx-auto'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between py-5'>
                <div className='flex-1 text-center md:text-left'>
                    <a href="/">
                        <h1 className='font-bold text-3xl text-center md:text-left font-montserrat'>
                            Doable™
                        </h1>
                    </a>
                    <p>
                     "a place for everything and everything in its place"
                    </p>
                    <span>- Benjamin Franklin</span>
                </div>
                <div className='flex flex-col flex-1 items-start justify-center'>
                    <ul className='flex md:w-1/2 lg:w-3/5  flex-wrap  items-start text-start pt-4 justify-center space-x-3'>
                        {paths.map((o,i) => {
                            return (
                                <Link {...o} key={i}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <span className=''>Made with <span className='inline-block'><BsFillSuitHeartFill/></span> by <a className='underline text-blue-500' href="https://porfolio-alex-srebernic.web.app/">Alex Srebernic</a></span>
            </div>
        </div>
        
    </footer>
  )
}

export default Footer