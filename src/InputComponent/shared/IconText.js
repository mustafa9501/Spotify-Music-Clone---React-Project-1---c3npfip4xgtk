import { Icon } from '@iconify/react'
import React from 'react'

const IconText = ({iconName, displayText, active}) => {
  return (
    <div className='flex pt-3 pl-3 cursor-pointer'>
        <div className='hover:text-white'>
            <Icon 
            icon={iconName}
            // color={active ? "white" : "gray"}
            fontSize={28}
            />
        </div>
        <div className={`${active ? "text-white" : "text-zinc-400"} font-bold p-1 pl-3 hover:text-white`}>{displayText}</div>
    </div>
  )
}

export default IconText
