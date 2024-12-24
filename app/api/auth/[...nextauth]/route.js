import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/user"; // Ensure this is your actual User model path
class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "CustomError";
      this.statusCode = statusCode;
    }
  }
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        // Ensure email and password are provided
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and Password are required");
        }

        // Fetch user from database
        const findUser = await User.findOne({ where: { email: credentials.email } });

        // Check if user exists
        if (!findUser) {
           
        
  throw new CustomError("no user", 404); // 404: Not
           // Return null to indicate failure
        }
      console.log(credentials.password);
        // Compare password
        const isPasswordValid = await bcrypt.compare(credentials.password, findUser.password);
        //  const isValid=credentials.password == "saba" ? true:false;
        if (!isPasswordValid) {
          console.error("Invalid credentials");
          return null; // Return null to indicate failure
        }

        // Successful authentication
        return {
          id: findUser.id,
          email: findUser.email,
        };
      },
    }),
  ],

  // Use JWT for session handling
  session: {
    strategy: "jwt",
  },

  // Secret for encrypting JWT
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Called when JWT is created or updated (on sign-in or on session check)
    async jwt({ token, user }) {
      if (user) {
        // On successful sign-in, store user info in the token
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    // Called when the session is checked (on each page load)
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },
  },

  // Optional: Custom error or sign-in page
  pages: {
    signIn: "/login", // Define a custom sign-in page
    error: "/error", // Custom error page (optional)
  },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
