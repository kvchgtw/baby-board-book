'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles/Header.module.css'

 
export default function NavCreate() {
  const pathname = usePathname()

  return(
    <Link href='/create'>
      <div className={pathname === '/create' ? `${styles.link} ${styles.link_active}`: styles.link}>
        Create
      </div>
    </Link>
  )

}