import Link from 'next/link'
import Auth from './auth.js'
import { UserButton, auth } from "@clerk/nextjs";
import styles from './styles/Header.module.css'


// export default function Header(){
//     const { userId } = auth();

//     return(
//       <>
//       <Auth />
//       <div>
       
       
//        <nav className={styles.navBar}>
//             <div className={styles.homeBtnContainer}>
//                 <Link href='/'>
//                     <div className={styles.navHomeBtn}>
//                         AI Baby Board Book
//                     </div>
//                 </Link>
//             </div>
//             <div className={styles.signRightContainer}>
//                 {!userId &&(
//                     <>
                        
//                         <div className={styles.signBtnContainer}>

//                         <Link href='/sign-up'>
//                             <div className={styles.signUpBtn}>
//                                     Sign-up
//                             </div>
//                         </Link>
//                         <Link href='/sign-in'>
//                             <div className={styles.signInBtn}>
//                                     Sign-in
//                             </div>
//                         </Link>
                            
//                         </div>
//                     </>
//                     )
//                 }
//                 <div className={styles.logoutBtn}>
//                     <UserButton afterSignOutUrl="/" />
//                 </div>
//             </div>
//        </nav>
       

//        {/* <div>
//             <Link href='/create'>
//                 Create
//             </Link>
//        </div> */}
        
//        </div>
//       </>
//     )
//   }




const Header = async ({ username }) => {
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
             
              <div className='ml-auto'>
                  <UserButton afterSignOutUrl='/' />
              </div>
          </div>
      </nav>
      </>
  );
};

export default Header;
