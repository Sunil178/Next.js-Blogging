"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);
        try {
            // redirect: false allows us to handle the transition smoothly in React
            await signOut({ redirect: false });

            // router.refresh ensures the Server Components (like Navbar)
            // re-sync with the now-empty session
            router.refresh();

            // Send them back to login or home
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button onClick={handleLogout} className={className} disabled={isPending} style={{ cursor: isPending ? "not-allowed" : "pointer" }}>
            {isPending ? "Signing out..." : children || "Logout"}
        </button>
    );
}
