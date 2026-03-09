import Link from 'next/link';
import { Phone, MapPin, Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 hidden md:block">
        <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1 text-yellow-500" /> Hotline: +84 28 3841 0068</span>
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-yellow-500" /> Hệ thống cửa hàng</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-yellow-400 transition-colors">Về chúng tôi</Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">Tuyển dụng</Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center">
            {/* Logo placeholder */}
            <div className="text-2xl font-bold text-yellow-600 tracking-tighter flex flex-col leading-none">
              <span>GIÁ VÀNG</span>
              <span className="text-[10px] font-normal text-gray-500 tracking-widest uppercase mt-1">Trong Nước</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-800 font-medium hover:text-yellow-600 transition-colors">TRANG SỨC</Link>
          <Link href="#" className="text-gray-800 font-medium hover:text-yellow-600 transition-colors">ĐỒNG HỒ</Link>
          <Link href="#" className="text-yellow-600 font-bold border-b-2 border-yellow-600 pb-1">BẢNG GIÁ VÀNG</Link>
          <Link href="#" className="text-gray-800 font-medium hover:text-yellow-600 transition-colors">TIN TỨC</Link>
          <Link href="#" className="text-gray-800 font-medium hover:text-yellow-600 transition-colors">KHUYẾN MÃI</Link>
        </nav>

        <div className="flex items-center">
          <button className="text-gray-600 hover:text-yellow-600 transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
