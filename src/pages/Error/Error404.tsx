import React from 'react'
import { useRouteError } from 'react-router-dom';
export default function Error404Page() {
    const error:any = useRouteError();
    console.error(error);
    return (
      <div id="error-page" className='text-center py-6 h-3/4 flex items-center justify-center'>
        <div>
        <h1 className='font-semibold text-3xl'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className=''>
          <i>{error.statusText || error.message}</i>
        </p>
        <a href="/" >
            <button className='my-2 py-2 px-4 text-white font-semibold rounded-xl hover:text-gray-300 transition hover:shadow bg-[#225FFC]'>Go back</button>
        </a>
        </div>
      </div>
    );
  }