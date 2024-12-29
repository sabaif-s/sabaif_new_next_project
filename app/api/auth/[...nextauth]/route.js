import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
 
import bcrypt from "bcrypt";
import User from "@/models/user"; // Adjust the path to your User model accordingly

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

const authOptions = {
  providers: [
    // Credentials Provider for Email/Password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new CustomError("Email and Password are required", 400);
        }

        // Fetch the user from the database
        const findUser = await User.findOne({ where: { email: credentials.email } });

        if (!findUser) {
          throw new CustomError("No user found with this email", 404);
        }

        // Validate password using bcrypt
        const isPasswordValid = await bcrypt.compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          throw new CustomError("Invalid credentials", 401);
        }

        // Return user information on successful authentication
        return { id: findUser.id, email: findUser.email };
      },
    }),

    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  // JWT-based session strategy
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Invoked after user login
    async signIn({ user, account, profile }) {
      console.log("profile", profile);
         console.log("account", account);
         console.log("user", user);
      if (account.provider === "facebook" && !profile.email) {
         
        return false;
      }
      if (user) {
        try {
          // Create FormData object
          const formData = new FormData();
          formData.append("email", user.email);
          formData.append('password',user.id);
          formData.append("username", user.name);  // You can adjust the user info sent
          if (user.image) {
            formData.append("file", user.image);  // Assuming the image URL is present
          }

          // Send FormData with POST request
          const response = await fetch("http://localhost:3000/api/upload", { // full URL in dev
            method: "POST",
            body: formData,  // Automatically handled
          });

          // Check if API response is successful
          if (response.ok) {
            const data = await response.json();
            console.log("Successfully sent user data to API:", data);
          } else {
            const data = await response.json();
            console.error("API response error:", data);
          }
        } catch (error) {
          console.error("Error sending data to API:", error);
        }
      }
      return true; // Allow the login
    },

    // Called when JWT is created or updated
    async jwt({ token, user, account }) {
      if (user) {
        console.log("user", user);
        token.id = user.id;
        token.email = user.email;
      }

      // Handle token updates for Facebook login
      if (account?.provider === "facebook") {
        token.provider = "facebook";
      }
      return token;
    },

    // Called when session is accessed
    async session({ session, token }) {
      if (token) {
        console.log("token", token);
        console.log('session',session);
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },

    // Handles redirection after login/logout
    // async redirect({ url, baseUrl }) {
    //    console.log("url", url);
    //    console.log("baseUrl", baseUrl);
    //    const newURL=baseUrl+`/dashboard`;
    //   return url.startsWith(baseUrl) ? newURL : newURL;
    // },
  },

  // pages: {
  //   signIn: "/login", // Custom login page
  //   error: "/error", // Optional custom error page
  // },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
