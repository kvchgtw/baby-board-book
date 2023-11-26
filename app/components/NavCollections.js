'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles/Header.module.css'

 
export default function NavCollections() {
  const pathname = usePathname()

  return(
    <Link href='/collections'>
      <div className={pathname === '/collections' ? `${styles.link} ${styles.link_active}`: styles.link}>
        Collections
      </div>
    </Link>
  )

}