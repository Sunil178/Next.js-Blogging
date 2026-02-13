import Link from "next/link";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import LogoutButton from "./auth/LogoutButton";
import styles from "@/styles/navbar.module.css";

export default async function Navbar() {
    const session = await auth();
    const user = session?.user;

    // Logic for the Profile Icon
    const getAvatarContent = () => {
        // 1. Check for profile image (from your User model)
        if (user?.image) {
            return <img src={user.image} alt="Profile" className={styles.avatarImg} />;
        }
        // 2. Fallback to Initial Letter
        const initial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase();
        return <span className={styles.avatarInitial}>{initial}</span>;
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Vede<span className={styles.logoDot}>.</span>Guru
                </Link>

                <div className={styles.links}>
                    <Link href="/posts">Posts</Link>
                    {user && <Link href="/dashboard">Dashboard</Link>}
                </div>

                <div className={styles.authSection}>
                    {user ? (
                        <div className={styles.profileArea}>
                            <div className={styles.avatar}>{getAvatarContent()}</div>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>{user.name || "User"}</span>
                                <LogoutButton className={styles.logoutLink}>Logout</LogoutButton>
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth/login" className={styles.loginBtn}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
