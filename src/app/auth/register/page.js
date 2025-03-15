import Link from 'next/link'
import styles from '@/styles/login.module.css'
import Password from './password';
import CSRF from '@/components/csrf';

export default async function Register() {
    return <>
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.register}>
                    <form action='/api/auth/register' method='POST'>

                        <CSRF />

                        <div className={styles.section}>
                            <label htmlFor='username' className='required'>Username</label>
                            <input type="text" id='username' name="username" required />
                        </div>

                        <div className={styles.x_section}>
                            <div className={styles.section}>
                                <label htmlFor='firstName' className='required'>First Name</label>
                                <input type="text" id='firstName' name="firstName" required />
                            </div>

                            <div className={styles.section}>
                                <label htmlFor='middleName'>Middle Name</label>
                                <input type="text" id='middleName' name="middleName" />
                            </div>
                        </div>

                        <div className={styles.x_section}>
                            <div className={styles.section}>
                                <label htmlFor='lastName' className='required'>Last Name</label>
                                <input type="text" id='lastName' name="lastName" required />
                            </div>

                            <div className={styles.section}>
                                <label htmlFor='email' className='required'>Email</label>
                                <input type="email" id='email' name="email" required />
                            </div>
                        </div>

                        <Password />

                        <div className={styles.section}>
                            <input type='submit' value="Register" />
                        </div>

                        <div className={styles.x_section}>
                            <span>Already have an account?</span><Link href="/auth/login" className={styles.link}>Log in!</Link>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </>
}
