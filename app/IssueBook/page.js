'use client'
import React, { useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Toast } from '../utils/Toast'


const page = () => {
  
    let today =new  Date().toLocaleDateString('en-CA')
    const [data, Setdata] = useState({date:today})
    console.log('date',data)
    const handleChange = (e) => {
        Setdata({ ...data, [e.target.name]: e.target.value })
        console.log('data', data)
    }


    async function issueBook() {


        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let res = await fetch("http://localhost:3000/api/issuebook", requestOptions)
        let json1 = await res.json()

        
     Toast(json1)
        if(json1.success){
            Setdata({
                isbn:"",
                member_id:""
            })
        }

    }

    return (
        <>



            <div class="flex items-center justify-center min-h-screen">
                <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h1 class="text-2xl font-bold text-center text-gray-800">Issue a Book</h1>

                    <form class="space-y-6" action={issueBook}>
                        <div>
                            <label for="isbn" class="block text-sm font-medium text-gray-700">Book ID / ISBN</label>
                            <input
                                type="text"
                                id="isbn"
                                name="isbn"
                                placeholder="e.g., 978-0321765723"
                                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={data.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label for="member_id" class="block text-sm font-medium text-gray-700">Member ID</label>
                            <input
                                type="text"
                                id="member_id"
                                name="member_id"
                                placeholder="e.g., M-1024"
                                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={data.addno}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div>
                            <label for="date" class="block text-sm font-medium text-gray-700">Issue Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={data.date}
                                onChange={handleChange}
                                required
                            />
                        </div>




                        <div>
                            <button
                                type="submit"
                                class="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Issue Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
