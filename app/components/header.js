import Link from 'next/link'
import Auth from './auth.js'
import { UserButton, auth } from "@clerk/nextjs";
import styles from './styles/Header.module.css'
import NavCollections from './NavCollections.js'
import NavCreate from './NavCreate.js'



const Header = async () => {
  const { userId } = auth();

  return (
    
    <>
    <Auth />
    
    <nav className={styles.nav}>
          <div className='flex items-center'>
              <Link href='/'>
                  <div className={styles.navItem}>AI Baby Board Book</div>
              </Link>
          </div>
          <div className={styles.SignItemsCenter}>
              {!userId && (
                  <>
                      <Link href='sign-in'>
                          <div className={styles.link}>Sign In</div>
                      </Link>
                      <Link href='sign-up'>
                          <div className={styles.link}>Sign Up</div>
                      </Link>
                  </>
              )}
              {userId &&(
                <>
                    <NavCreate />
                    
                    <NavCollections />
                </>
              )}
              <div className='ml-auto'>
                  <UserButton afterSignOutUrl='/' />
              </div>
          </div>
      </nav>
      </>
  );
};

export default Header;
