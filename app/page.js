import Link from 'next/link'
import styles from './components/styles/Index.module.css'
import Footer from './components/Footer'
import foxRaccoonBg from './components/styles/images/indexFirstBg.svg'; // Adjust the path as necessary
import foxRaccoon from './components/styles/images/fox_raccoon.png'
import Image from 'next/image';



export default function homepage(){
  return(
    <>      
        <div className={styles.homePageElementContainer}>
          <div className={styles.indexFirstImageContainer}>
            
              <Image priority={true}   sizes="100vw" src={foxRaccoonBg}  className={styles.foxRaccoonBg}   
                style={
                  {objectFit: 'cover',}
                }
              />
              <span>
                <Image priority={true}   sizes="100vw" src={foxRaccoon}  className={styles.foxRaccoon}   
                  style={
                    {objectFit: 'cover',}
                  }
                />
              </span>
            
          </div>
          <div className={styles.mainElement}>
            <div className={styles.mainElementCenter}>
              <div className={styles.titleText}>
              Discover the Joy of Reading Together
              </div>
              <div className={styles.subTitleText}>
              AI Baby Board Books is designed for loving family moments.            </div>
              <div className={styles.ctaBtnConatainer}>
                <Link href='/create'>
                  <button className={styles.createCTAbtn}>Create Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}