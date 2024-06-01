import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className=''>
          <Link href="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-8'>
            Home
          </Link>
          <Link href="/profile" className='mx-8'>
            Profile
          </Link>
          <Link href="/posts" className='mx-8'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header