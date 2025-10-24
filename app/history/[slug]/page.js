'use client'
import { database } from '@/app/utils/firebaseConfig'
import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
    const [data, Setdata] = useState()

useEffect(() => {    const getData = async () => {
        let {slug} = await params
          const user = ref(database, 'Books/'+slug)
        await get(user).then((snapshot) => {
               if (snapshot.exists()) {
                  
                   console.log('datadd ', snapshot.val().history.isIssued)
                
               Setdata(   Object.entries(snapshot.val().history))
                  //console.log('snapshot.val()', snapshot.val())
                   
               } else {
                   console.log('no data')
               }
           }).catch((err) => { console.log('err', err) });
  }
  getData()


}, [])


  return (
    <>
    <div className='p-20'>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
    

        <div className="overflow-x-auto">
          {/* FIX 8: Removed the ref={table} */}
          <table className="min-w-full divide-y divide-gray-200" id='table'>
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
             
            {data && data.map(([key, subDa]) => (
  <tr key={key}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className={"text-sm font-semibold text-gray-500"+(subDa.isIssued?" text-green-600":" text-red-600")} >{subDa.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className={"text-sm font-semibold text-gray-500"+(subDa.isIssued?" text-green-600":" text-red-600")}>{new Date(subDa.issuedon).toLocaleDateString()}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className={"text-sm font-semibold text-gray-500"+(subDa.isIssued?" text-green-600":" text-red-600")}>{new Date(subDa.returnedOn).toLocaleDateString()}</div>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default page
