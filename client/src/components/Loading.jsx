import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full absolute top-0 right-0 z-50 bg-[#ffffffc3] flex items-center justify-center'>
        <img src="/loader.gif" alt="" className='h-16 sm:h-32' />
    </div>
  )
}

export default Loading