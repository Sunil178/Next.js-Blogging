import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            authorize(credentials, req) {
                if (credentials.Password === "password") {
                    return {
                        name: "John Doe",
                        email: "john@doe.com",
                    };
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    debug: true
};

export default NextAuth(authOptions);
