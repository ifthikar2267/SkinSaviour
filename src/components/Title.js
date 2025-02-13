import React from 'react'

const Title = ({text1 , text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className="text-muted">
         {text1} <span className="text-dark fw-medium">{text2}</span>
        </p>
    </div>
  )
}

export default Title;