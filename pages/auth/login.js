import Link from 'next/link'
import styles from 'styles/login.module.css'
import { getCsrfToken } from "next-auth/react";

export default function Login({ csrfToken }) {
    return <>
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.login}>
                    <form action='/api/login' method='POST'>

                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

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

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            csrfToken
        }
    };
}
