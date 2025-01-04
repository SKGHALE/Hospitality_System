import React from 'react'
import { Home, BookOpen, Users, Settings } from 'lucide-react'

export function Sidebar() {
    const menuItems = [
        { icon: Home, text: 'Dashboard', active: true },
        { icon: BookOpen, text: 'Books' },
        { icon: Users, text: 'Members' },
        { icon: Settings, text: 'Settings' },
    ]

    return (
        <div className="bg-white bg-opacity-30 backdrop-blur-md text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <a href="#" className="text-gray-800 flex items-center space-x-2 px-4">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-2xl font-extrabold">LibraryMS</span>
            </a>
            <nav>
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`block py-2.5 px-4 rounded transition duration-200 ${item.active
                            ? "bg-white bg-opacity-50 text-gray-800"
                            : "hover:bg-white hover:bg-opacity-20 text-gray-700"
                            }`}
                    >
                        <item.icon className="inline-block w-6 h-6 mr-2 -mt-1" />
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    )
}

