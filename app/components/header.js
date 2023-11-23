import Link from 'next/link'
import Auth from './auth.js'
import { UserButton, auth } from "@clerk/nextjs";
import styles from './styles/Header.module.css'


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
                    <Link href='/create'>
                        <div className={styles.link}>
                            Create
                        </div>
                    </Link>
                    
                    <Link href='/collections'>
                        <div className={styles.link}>
                            Collections
                        </div>
                    </Link>
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
