import Link from 'next/link'
import styles from './components/styles/Index.module.css'
export default function homepage(){
  return(
    <>
    <div className={styles.homePageBackground}>
      
      <div className={styles.homePageElementContainer}>
        <div className={styles.spaceElement}>
          
        </div>
        <div className={styles.mainElement}>
          <div className={styles.mainElementCenter}>
            <div className={styles.titleText}>
              AI Baby Board Book
            </div>
            <div className={styles.subTitleText}>
            Create your own AI Baby Board Book
            </div>
            <Link href='/create'>
              <button className={styles.createCTAbtn}>Create Now</button>
            </Link>
          </div>
        </div>
      </div>


    </div>
    <div></div>
    </>
  )
}