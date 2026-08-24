import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="h-24 flex justify-between items-center px-5 border-b border-b-gray-700 shadow">
      <div className='flex justify-center items-center gap-5'>
        <img src="logo.png" className='w-20 h-20 object-cover' alt="logo" />
        <nav className='flex gap-2.5'>
          <Link  to={`/`}>Trang chủ</Link>
          <Link to={`/books`}>Sách mới</Link>
          <Link to={`/about`}>Về chúng tôi</Link>
          <Link to={`/blog`}>Blog</Link>
        </nav>
      </div>
      <div className='flex justify-between items-center gap-5'>
        <div className='border px-4 py-2 rounded-xl'>
          <input type="text" className="border-0 outline-none focus:outline-none focus:ring-0" name="search" id=""  placeholder='Tìm kiếm ...' />
          <FontAwesomeIcon className='text-gray-500 cursor-pointer' icon={faMagnifyingGlass} />
        </div>
        <div className='flex justify-center items-center gap-2 border-l py-2 px-4'>
          <FontAwesomeIcon className='text-2xl' icon={faCartShopping} />
          <FontAwesomeIcon className='text-2xl' icon={faCircleUser} />
        </div>
      </div>
    </header>
  )
}
