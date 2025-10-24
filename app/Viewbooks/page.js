'use client'
// 'onValue' was imported but not used, so I removed it.
import { get, ref, remove } from 'firebase/database'
// 'useRef' is no longer needed
import React, { useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'

import { redirect } from 'next/navigation'

const Page = () => {
  
  const [data, setdata] = useState([])
  const [update, setupdate] = useState({})
  
  const [search, setsearch] = useState('')
  
 


  const handleChange = (e) => {
    setsearch(e.target.value);
  }

  // Moved uref definition up here for clarity.
  const uref = ref(database, 'Books')



  useEffect(() => { 
     const getData = async () => {
    await get(uref).then((snapshot) => {
      if (snapshot.exists()) {
        const userArr = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data, }))
        setdata(userArr)
      } else {
        console.log('no data')
      }
    }).catch((err) => { console.log('err', err) });
  }
    getData()
  }, [])


  function DeleteRecords(id) {
    const Delete = ref(database, 'Books/' + id)
    remove(Delete).then(setupdate({ success: true, message: "Record Deleted" })).catch((e) => setupdate({ success: false, message: "Error in Deleteing the Record " + e }))
    setdata(data.filter(data => data.id != id))
  }

  function Update(id) {
    redirect("/AddBooks/" + id)
  }
  function View(id) {
    redirect("/history/" + id)
  }

  // FIX 5: Filter logic is now here, inside the render.
  // This creates a new array based on the 'data' and 'search' states.
  const filteredData = data.filter(item =>
    (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
    (item.isbn && item.isbn.toLowerCase().includes(search.toLowerCase()))
  );


  return (<>
    <div className='p-20'>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* FIX 6: Changed all 'class' to 'className' below */}
        <div className="max-w-3xl mx-auto mb-5">

          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            {/* FIX 7: Input is now controlled by the 'search' string state */}
            <input onChange={handleChange} value={search} type="search" id="default-search" name='search' className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Books by Title or ISBN..."  />
          </div>

        </div>

        <div className="overflow-x-auto">
          {/* FIX 8: Removed the ref={table} */}
          <table className="min-w-full divide-y divide-gray-200" id='table'>
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pub. Year
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* FIX 9: We now map over 'filteredData' instead of 'data' */}
              {/* I also removed the unnecessary <></> Fragment */}
              {filteredData.length > 0 ? (
                filteredData.map(data => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Added safety checks (data.title &&) in case data is missing */}
                      <div className="text-sm font-medium text-gray-900">{data.title}</div>
                      <div className="text-sm text-gray-500">{data.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.genre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.isbn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.copies - data.issued}/{data.copies}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => View(data.id)} className="cursor-pointer text-green-600 hover:text-green-900 mr-4">View</button>
                      <button onClick={() => Update(data.id)} className="cursor-pointer text-indigo-600 hover:text-indigo-900">Edit</button>
                      <button onClick={() => DeleteRecords(data.id)} className="cursor-pointer text-red-600 hover:text-red-900 ml-4">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                // This provides better feedback to the user
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    {search ? 'No books match your search.' : 'Loading books...'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default Page