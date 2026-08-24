import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
      <p className="text-gray-600 mt-4 mb-6">Trang bạn tìm không tồn tại.</p>
      <Link
        to="/"
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Về trang chủ
      </Link>
    </div>
  )
}
