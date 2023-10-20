import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "@/public/ghc_logo.png"
import useGetUser from '@/utils/frontend/useGetUser'

const Navbar:React.FC<any> = (props) => {
    const [user, isLoading, isError] = useGetUser();
    const noUserCondn = isError || !user;

    return (
        <div {...props}>
            <div className="antialiased bg-black">
                <div className="w-full text-gray-200 bg-black">
                    <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                        <Link href="/" className="flex flex-row items-center justify-between p-4">
                            <Image height={50} width={50} src={logo} alt='logo' />
                        </Link>
                        <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
                            <Link className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/">Home</Link>
                            <Link className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Events</Link>
                            <Link className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</Link>
                            {isLoading ? <p className='px-8 py-1 text-sm font-semibold'>...</p> : <Link className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={noUserCondn ? "/login" : "/team"}>{noUserCondn ? "Login" : "Team"}</Link>}

                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar