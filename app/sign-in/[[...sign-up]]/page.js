import { SignIn } from "@clerk/nextjs";
import styles from '../../components/styles/Signin.module.css'
import Footer from '../../components/Footer'



const SignInPage = () => {
  return (
    <>
        <div className={styles.signInContainer}>
        <SignIn />
        </div>
      <Footer />

    </>
  )
}

export default SignInPage
