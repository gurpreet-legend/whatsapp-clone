import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../context/authContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
    const [open, setOpen] = useState("hidden")

    const { logOut, user } = UserAuth();

    const handleLogOut = () => {
        try {
            logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-lg mx-auto">

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button" data-dropdown-toggle="dropdown">Dropdown button <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

            <div className={`${open} bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`} id="dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm">{user.displayName}</span>
                    <span className="block text-sm font-medium text-gray-900 truncate">{user.email}</span>
                </div>
                <ul className="py-1" aria-labelledby="dropdown">
                    <li>

                        {!user.accessToken && < Link to="signin" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Signin
                        </Link>}

                    </li>
                    <li>
                        {user.accessToken && < Link to="signin" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            SignOut
                        </Link>}
                    </li>
                    {/* <li>
                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
                    </li> */}
                </ul>
            </div>
        </div >
    );
}