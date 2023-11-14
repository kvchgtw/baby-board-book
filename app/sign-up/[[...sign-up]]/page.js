// import { SignUp } from '@clerk/next.js'
import { SignUp } from "@clerk/nextjs";
import styles from '../../components/styles/Signup.module.css'



const SignUpPage = () => {
  return (
    <>
        <div className={styles.signUpContainer}>
          <SignUp />
        </div>
    </>
  )
}

export default SignUpPage
