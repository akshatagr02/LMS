'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookPlus, BookOpen, BookCheck, BookCopy, UserPlus, Users } from 'lucide-react'

export default function LibraryHome() {
  const router = useRouter()

  const navItems = [
    { label: 'AddBook', path: '/AddBooks/newBook', icon: <BookPlus className="w-6 h-6" /> },
    { label: 'ReturnBook', path: '/ReturnBook', icon: <BookCheck className="w-6 h-6" /> },
    { label: 'ViewBook', path: '/Viewbooks', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'IssueBook', path: '/IssueBook', icon: <BookCopy className="w-6 h-6" /> },
    { label: 'Add Student', path: '/newStudent', icon: <UserPlus className="w-6 h-6" /> },
    { label: 'StudentManager', path: '/StudentManager', icon: <Users className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold flex text-gray-800 mb-12 tracking-tight"
      >
        <img src='book.png' className='h-9 mr-3'></img> <span class="self-center text-3xl font-semibold whitespace-nowrap text-green-600">Library<span className='text-blue-600'>Manager</span> <span className='text-black'>Dashboard</span></span>
      </motion.h1>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(item.path)}
            className="bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer
                       rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200"
          >
            <div className="text-blue-600 mb-3">{item.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">{item.label}</h2>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Library Management System
      </motion.footer>
    </div>
  )
}
