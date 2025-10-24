'use client'
import { database } from '@/app/utils/firebaseConfig'
import { Toast } from '@/app/utils/Toast'
import { get, ref, update } from 'firebase/database'
import { redirect } from 'next/navigation'

import React, { useEffect, useState } from 'react'



function page({params})  {
const [isUpdate, setisUpdate] = useState(false)


    function generateISBN10() {
  let sum = 0;
  let isbn = "";

  for (let i = 0; i < 9; i++) {
    const d = Math.floor(Math.random() * 10);
    isbn += d;
    sum += d * (i + 1);
  }

  let check = sum % 11;
  isbn += (check === 10) ? 'X' : check;
  return isbn;
}

    const [data, Setdata] = useState({
        genre:"Select Genre",
        isbn:generateISBN10(),
        issued:0,
        history:{}

    })

    
    useEffect( () => {
        async function check() {
            
            let {slug}=await params
            const user = ref(database, 'Books/'+slug)
            
            if(slug !="newBook"){
                setisUpdate(true)
                get(user).then((snapshot) => {
            if (snapshot.exists()) {
                
                console.log('datadd ', snapshot.val())
                Setdata(snapshot.val())
                
            } else {
                console.log('no data')
            }
        }).catch((err) => { console.log('err', err) });
    }
}
check()

}, [])

    
async function updateBook() {
     let {slug}=await params
        const bookfu = ref(database, 'Books/'+slug)
   update(bookfu,data).then(()=>{
    redirect("/Viewbooks/")
   })
}


    const handleChange = (e) => {
        Setdata({ ...data, [e.target.name]: e.target.value })
        console.log('data', data)
    }
    const AddBook =async () => {
       
        Setdata({...data,"inStock":data.copies})
        console.log('data.copies', data)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
            let a = await fetch("http://localhost:3000/api/add", requestOptions)
        let d = await a.json()
        Toast(d)
        



        Setdata(
            {
                author: "",
                copies: "",
                description: "",
                isbn: "",
                title: "",
                genre: "Select Genre",
                year: ""
            }
        )
    

    }

    return (
        <>
     
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">

                <div className="w-full max-w-6xl p-8 ">

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Add a New Book</h1>
                        <p className="text-gray-500 mt-1">Fill in the details below to add a new book to the library.</p>
                    </div>

                    <form className="space-y-6" action={isUpdate?updateBook:AddBook}>

                        <div>
                            <label for="book-title" className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={data.title}
                                id="book-title"
                                placeholder="e.g., The Great Gatsby"

                                className="w-full px-4 py-2 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required />
                        </div>

                        <div>
                            <label for="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                onChange={handleChange}
                                value={data.author}
                                placeholder="e.g., F. Scott Fitzgerald"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required />
                        </div>

                        <div>
                            <label for="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                id="isbn"
                                onChange={handleChange}
                                value={data.isbn}
                                disabled={true}
                                placeholder="e.g., 978-0743273565"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required />
                        </div>

                        <div>
                            <label for="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <select
                                id="genre"
                                name="genre"
                                onChange={handleChange}
                                value={data.genre}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white"
                            >
                                <option value="Select Genre">Select Genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="science-fiction">Science Fiction</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="mystery">Mystery</option>
                                <option value="biography">Biography</option>

                            </select>
                        </div>

                        <div>
                            <label for="year" className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={data.year}
                                name="year"
                                id="year"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required />
                        </div>

                        <div>
                            <label for="copies" className="block text-sm font-medium text-gray-700 mb-1">Number of Copies</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={data.copies}
                                name="copies"
                                id="copies"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required />
                        </div>

                        <div>
                            <label for="description" className="block text-sm font-medium text-gray-700 mb-1">Description / Synopsis</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                onChange={handleChange}
                                value={data.description}
                                placeholder="A brief summary of the book..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                required ></textarea>
                        </div>

                     

                        <div className="flex items-center justify-end pt-4 space-x-4">

                            <button
                                type='submit'

                                className="px-6 py-2 disabled:bg-indigo-400 cursor-pointer bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                               {isUpdate?'Update Book': 'Add Book'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default page
