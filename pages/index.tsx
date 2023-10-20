import Navbar from '@/components/Navbar'
import Image from 'next/image'
import cover_page from "@/public/cover_page.png"
import Banner from '@/components/Banner'

export default function Home() {
  return (
    <div className="bg-gray-900 relative">
      <Navbar className="min-h-screen" />

      <div className='box-home'>
        <Image className='w-fit h-fit' fill src={cover_page} alt='cover_page' />
      </div>


      <Banner />

    </div>
  )
}

