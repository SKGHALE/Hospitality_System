'use client'
import React from 'react'
import { BookOpen, Users, ArrowUp, DollarSign } from 'lucide-react'
import { Sidebar } from '../layout/Sidebar'
import Navbar from '../layout/Navbar'

export default function DashboardContent() {
  const bookStats = [
    { title: 'Total Books', value: '1,234', icon: BookOpen },
    { title: 'Active Members', value: '567', icon: Users },
    { title: 'Books Borrowed', value: '89', icon: ArrowUp },
    { title: 'Fines Collected', value: '$123', icon: DollarSign },
  ]

  const books = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780446310789', status: 'Available' },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', status: 'Borrowed' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', status: 'Available' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', status: 'Borrowed' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769174', status: 'Available' },
  ]

  return (
    <div className="flex h-screen bg-sky-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent backdrop-blur-md">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-800 text-3xl font-medium mb-6">Library Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {bookStats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-800">{stat.title}</h4>
                    <stat.icon className="h-6 w-6 text-gray-800" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
            <h3 className="text-gray-800 text-2xl font-medium mb-4">Recent Books</h3>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 bg-opacity-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white bg-opacity-50 divide-y divide-gray-200">
                  {books.map((book, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.isbn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

