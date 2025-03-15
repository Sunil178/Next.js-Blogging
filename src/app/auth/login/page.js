import Link from 'next/link'
import styles from '@/styles/login.module.css'
import CSRF from '@/components/csrf';
import { useSession, signIn } from "next-auth/react"

export default async function Login() {
    return <>
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.login}>
                    {/* <form action={signIn} method='POST'> */}
                    <form action='/api/auth/callback/credentials' method='POST'>

                        <CSRF />

                        <div className={styles.section}>
                            <label htmlFor='username'>Username</label>
                            <input type="text" id='username' name="username" />
                        </div>

                        <div className={styles.section}>
                            <label htmlFor='password'>Password</label>
                            <input type="password" id='password' name='password' />
                        </div>

                        <div className={styles.section}>
                            <input type='submit' value="Login" />
                        </div>

                        <div className={styles.x_section}>
                            <span>Don’t have an account?</span><Link href="/auth/register" className={styles.link}>Sign up!</Link>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </>
}
