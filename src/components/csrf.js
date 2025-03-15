'use client'
import { useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";

export default function CSRF() {
    const [ csrf, setCsrf ] = useState();
    useEffect(() => {
        async function fetchData() {
            const csrfToken = await getCsrfToken();
            setCsrf(csrfToken);
        }
        fetchData();
    }, []);
    return (<input name="csrfToken" type="hidden" defaultValue={csrf} />);
}
