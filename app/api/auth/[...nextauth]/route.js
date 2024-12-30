import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "@/models/user"; // Adjust path as needed

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const findUser = await User.findOne({ where: { email: credentials.email } });
        if (!findUser) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, findUser.password);
        if (!isPasswordValid) return null;

        return { id: findUser.id, email: findUser.email, provider: "credentials" };
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/providers",
    error: "/providers"
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("account", account);
      if (account.provider === "facebook" && !profile.email) {
        return false;
      }
      // if (user && account.provider == "facebook") {
      //   try {
      //     const formData = new FormData();
      //     formData.append("email", user.email);
      //     formData.append('password', user.id);
      //     formData.append("username", user.name);  // You can adjust the user info sent
      //     if (user.image) {
      //       formData.append("file", user.image);  // Assuming the image URL is present
      //     }

      //     // Send FormData with POST request
      //     const response = await fetch("http://localhost:3000/api/upload", { // full URL in dev
      //       method: "POST",
      //       body: formData,  // Automatically handled
      //     });

      //     // Check if API response is successful
      //     if (response.ok) {
      //       const data = await response.json();
      //       console.log("Successfully sent user data to API:", data);
      //     } else {
      //       const data = await response.json();
      //       return false;
      //     }
      //   } catch (error) {
      //     return false;
      //   }
      // }
      return true; // Allow the login
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "facebook" && account.access_token) {
        token.accessToken = account.access_token;
        token.provider = "facebook";
        // Store Facebook access token
      } else if (user) {
        token.id = user.id;
        token.email = user.email;
        token.provider = "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      if (token.provider === "facebook") {
        session.user = { id: token.id, email: token.email };
        session.accessToken = token.accessToken;
        session.provider = token.provider;
        // Pass access token to the session
      } else if (token.provider === "credentials") {
        session.user = { id: token.id, email: token.email };
        session.provider = token.provider;
        // Pass user info to the session
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // We prevent the callbackUrl from showing up
      const cleanUrl = url.split('?')[0]; // Strip off the query parameters

      // You can force a custom redirect here, for example, after authentication
      if (url === baseUrl + "/api/auth/signin" || url.startsWith(baseUrl + "/providers")) {
        return baseUrl + "/dashboard";  // Redirect to dashboard (or your desired URL)
      }

      // Optionally, handle other scenarios or add fallback logic
      return cleanUrl;  // Clean URL without callbackUrl
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };