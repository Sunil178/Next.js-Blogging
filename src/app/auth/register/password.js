'use client'
import { useState } from 'react';
import styles from '@/styles/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function Password() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
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
    )
}
