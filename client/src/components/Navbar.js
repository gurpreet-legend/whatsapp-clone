import React from 'react'
import Dropdown from './dropdown'
import { UserAuth } from '../context/authContext';

function Navbar() {

    return (
        <div className='w-full flex .justify-between content-center items-center space-x-96 h-14 bg-gradient-to-r from-green-500 to-green-800'>
            <div className="flex-initial p-6 max-w-sm flex items-center space-x-4">
                <div className="shrink-0">
                    <img className="h-12 w-12" src="./wt-logo.png" alt="ChitChat Logo" />
                </div>
                <div>
                    <div className="text-xl font-medium text-black">Wattsapp Clone</div>
                </div>
            </div>

            <Dropdown />
        </div>
    )
}

export default Navbar