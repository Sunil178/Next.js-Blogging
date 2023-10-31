import Link from 'next/link'
import { useState } from 'react';
import styles from 'styles/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { getCsrfToken } from "next-auth/react";

export default function Login({ csrfToken }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return <>
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.register}>
                    <form action='/api/register' method='POST'>

                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

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

                        <div className={styles.x_section}>
                            <div className={styles.section}>
                                <label htmlFor='password' className='required'>Password</label>
                                <input type={passwordVisible ? "text" : "password"} id='password' name='password' required />
                                <span className={styles.eye_icon}>
                                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} onClick={() => setPasswordVisible(!passwordVisible)} />
                                </span>
                            </div>

                            <div className={styles.section}>
                                <label htmlFor='password_confirmation' className='required'>Confirm Password</label>
                                <input type={confirmPasswordVisible ? "text" : "password"} id='password_confirmation' name='password_confirmation' required />
                                <span className={styles.eye_icon}>
                                    <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
                                </span>
                            </div>
                        </div>

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

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            csrfToken
        }
    };
}
