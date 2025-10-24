'use client'
import React, { useState } from 'react'
import { Toast } from '../utils/Toast'


const page = () => {
    const [data, Setdata] = useState({})
   
    const handleChange = (e) => {
        Setdata({ ...data, [e.target.name]: e.target.value })
        console.log('data', data)
    }
    async function ReturnBook() {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let d = await fetch("http://localhost:3000/api/returnBooks", requestOptions)
        let json1 = await d.json()


      Toast(json1)
      if (json1.success) {
         if (json1.fine>0) {
        alert(`you are delayed by ${json1.dayDef} days so fine is ${json1.fine}/-`)
    }else{
        alert(`No Fine!!!`)
    }
    Setdata({
        "member_id":"",
        "isbn":""
    })
      }
        




    }
    return (
        <>


            <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">

                <div class="w-full max-w-3xl p-8">

                    <div class="mb-8 text-center">
                        <h1 class="text-3xl font-bold text-gray-800">Return a Book</h1>
                        <p class="text-gray-500 mt-1">Enter your Member ID and the book's details to proceed.</p>
                    </div>

                    <form action={ReturnBook} method="POST" class="space-y-6">



                        <div>
                            <label for="isbn" class="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                id="isbn"
                                onChange={handleChange}
                                value={data.isbn}
                                placeholder="Enter the book's serial number or title"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                            />
                        </div>
                        <div>
                            <label for="member_id" class="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                            <input
                                type="text"
                                name="member_id"
                                id="member_id"
                                onChange={handleChange}
                                value={data.addno}
                                placeholder="Enter your library card number"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                            />
                        </div>
                        <div class="pt-4">
                            <button
                                type="submit"
                                class="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Return Book
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default page
