'use client'
import React, { useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from '../utils/Toast';

const page = () => {
 
  const [data, Setdata] = useState({
    semester: "1",
    cards: "6",
    books: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: ""
    }

  })
  const handleChange = (e) => {


    Setdata({ ...data, [e.target.name]: e.target.value })




    console.log('data', data)
  }
  async function addStudent(params) {





    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let d = await fetch("http://localhost:3000/api/addStudent", requestOptions)
    let json1 = await d.json()

   Toast(json1)
    Setdata({
      name:"",
      addno:"",
      phone:"",
      semester:1,
      email:"",
      address:"",
      course:""
    })

  }


  return (
    <>
   
      <div class="flex items-center justify-center min-h-screen p-4">

        <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md sm:p-8">

          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800">
              Student Library Registration
            </h1>
            <p class="mt-2 text-sm text-gray-600">
              Please fill out the form to create your library account.
            </p>
          </div>

          <form class="mt-8 space-y-6" action={addStudent} method="POST">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

              <div className='col-span-2' >
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={data.name}
                    autocomplete="given-name"
                    placeholder="John Marcorio"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>



              <div class="sm:col-span-2">
                <label for="addno" class="block text-sm font-medium text-gray-700">
                  Admission Number
                </label>
                <div class="mt-1">
                  <input
                    onChange={handleChange}
                    value={data.addno}
                    type="text"
                    name="addno"
                    id="addno"
                    placeholder="e.g., 25012055"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div class="mt-1">
                  <input
                    onChange={handleChange}
                    value={data.email}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="john.doe@school.edu"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className='col-span-2'>
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div class="mt-1">
                  <input
                    onChange={handleChange}
                    value={data.phone}
                    type="tel"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    placeholder="+91 12345 67890"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="semester" class="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <div class="mt-1">
                  <select
                    id="semester"
                    name="semester"
                    onChange={handleChange}
                    value={data.semester}
                    required
                    class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>

                  </select>
                </div>
              </div>


              <div>
                <label for="course" class="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <div class="mt-1">
                  <select
                    id="course"
                    onChange={handleChange}
                    value={data.course}
                    name="course"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Course</option>
                    <option value="cse">Computer Science and Engineering (CSE)</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="mech">Mechanical Engineering (ME)</option>
                    <option value="civil">Civil Engineering (CE)</option>
                    <option value="eee">Electrical & Electronics Engineering (EEE)</option>
                    <option value="ee">Electrical Engineering (EE)</option>
                    <option value="etc">Electronics & Telecommunication Engineering (ETC)</option>
                    <option value="chemical">Chemical Engineering</option>
                    <option value="biotech">Biotechnology Engineering</option>
                    <option value="mca">Master of Computer Applications (MCA)</option>
                    <option value="mba">Master of Business Administration (MBA)</option>
                    <option value="chemistry">Department of Chemistry</option>
                    <option value="physics">Department of Physics</option>
                    <option value="maths">Department of Mathematics</option>
                    <option value="humanities">Humanities / Management</option>
                    <option value="other">Other</option>

                  </select>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div class="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    onChange={handleChange}
                    value={data.address}
                    placeholder="123 Library Lane, Knowledge City, State, 12345"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>



            </div>



            <div>
              <button
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register Student
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default page
