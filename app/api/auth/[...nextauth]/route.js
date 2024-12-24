import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from '@/models/user';
// Mock user data (Replace this with a database lookup)
const users = [
  {
    id: 1,
    email: "testuser@gmail.com",
    password: await bcrypt.hash("password123", 10), // Hashed password
  },
];

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const findUser= await User.findOne({where:{email:credentials.email}});
        if(findUser){
            console.log(findUser);
        }
        else{
            console.log("no such email in db");
        }
        const user = users.find(
          (user) => user.email === credentials.email
        );

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return { id: user.id, email: user.email };
        }

        // If login fails, return null
        return null;
      },
    }),
  ],

  // Use JWT for session handling
  session: {
    strategy: "jwt",
  },

  // Optionally set a secret for encrypting JWT
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
      // Attach token properties to the session object
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },

//   pages: {
//     signIn: "/api/login", // Optional: Custom sign-in page
//   },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
