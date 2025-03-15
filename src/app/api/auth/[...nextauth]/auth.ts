import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/libs/db-connect";
import User from "@/models/User";
import authConfig from "@/auth.config";
import { compareSync } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                const user = await User.findOne({ email: credentials?.username });
                if (user && compareSync(credentials?.password, user.password)) {
                    console.log("🚀 ~ authorize ~ user:", user)
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user = user;
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
});
