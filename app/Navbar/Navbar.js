import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>


      <nav class="bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto  p-4">
          <Link href={"/"}>
            <div className='flex gap-2.5'>
              <img src='book.png' className='h-12'></img>

              <span class="self-center text-2xl font-semibold whitespace-nowrap text-green-600">Library<span className='text-blue-600'>Manager</span></span>
            </div>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link href="/AddBooks/newBook" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">AddBook</Link>
              </li>
              <li>
                <Link href="/ReturnBook" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">ReturnBook</Link>
              </li>
              <li>
                <Link href="/Viewbooks" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">ViewBook</Link>
              </li>
              <li>
                <Link href="/IssueBook" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">IssueBook</Link>
              </li>
              <li>
                <Link href="/newStudent" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Add Student</Link>
              </li>
              <li>
                <Link href="/StudentManager" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">StudentManager</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

export default Navbar
