import React from 'react'

export const ModalRemoveTag = ({acceptFunc,closeFunc,tagName}) => {

    function removeTagFunc(){
        acceptFunc()
        closeFunc()
    }

  return (
    <div className='font-montserrat '>
        <div>
            <h1 className='text-default font-medium text-lg py-2'>
                "{tagName}" Will be removed permanently
            </h1>
        </div>
        <div className='mb-3'>
            <span>
            You can't undo this change.
            </span>
        </div>
        <div className='space-x-3 flex items-center justify-end'>
            <button onClick={closeFunc} className='hover:text-gray-700 p-2 transition'>
                Cancel
            </button>
            <button onClick={removeTagFunc} className='bg-red-600 text-white p-2 rounded-md font-medium hover:bg-red-700 transition'>
                Remove tag
            </button>
        </div>
    </div>
  )
}
