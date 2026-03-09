import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldPriceChart from '@/components/GoldPriceChart';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] md:h-[400px] bg-gray-900 overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/jewelry/1920/600" 
            alt="Mi Hồng Jewelry" 
            fill 
            className="object-cover opacity-60"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Giá Vàng Trong Nước
                </h1>
                <p className="text-lg text-gray-200 mb-8">
                  Uy tín - Chất lượng - Tận tâm. Cập nhật giá vàng nhanh chóng và chính xác nhất thị trường.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                  Xem Bộ Sưu Tập
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Table */}
            <div className="lg:col-span-1">
              <GoldPriceTable />
            </div>
            
            {/* Right Column: Chart */}
            <div className="lg:col-span-2">
              <GoldPriceChart />
              
              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Uy Tín Hàng Đầu</h3>
                    <p className="text-sm text-gray-500">Hơn 30 năm kinh nghiệm trong lĩnh vực kinh doanh vàng bạc đá quý.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Cập Nhật Liên Tục</h3>
                    <p className="text-sm text-gray-500">Giá vàng được cập nhật liên tục theo biến động của thị trường trong nước và thế giới.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
