// import { SignUp } from '@clerk/next.js'
import { SignUp } from "@clerk/nextjs";
import styles from '../../components/styles/Signup.module.css'
import Footer from '../../components/Footer'



const SignUpPage = () => {
  return (
    <>
        <div className={styles.signUpContainer}>
          <SignUp />
        </div>
      <Footer />

    </>
  )
}

export default SignUpPage
