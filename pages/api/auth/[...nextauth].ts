import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const result = (await prisma.user.findUnique({
          where: { email },
        })) as {
          id: string;
          email: string;
          password: string;
          name: string;
          image: string;
          role: string;
        };

        const comparePassword = await bcrypt.compare(
          password,
          result?.password
        );
        if (!comparePassword) {
          console.log('password mismatch');
        }
        // if (result) {
        if (result && comparePassword) {
          // Any object returned will be saved in `user` property of the JWT
          // delete result.password;
          return {
            id: result.id,
            email: result.email,
            name: result.name,
            image: result.image,
            role: result.role,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null;
          throw new Error('Something went wrong');

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, //1 day
  },

  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
        session.id = token.id;
      }

      return session;
    },
    async jwt({ token, account, profile, user }) {
      // console.log(user?.name);
      if (user) {
        token.id = user.id;
        token.role = user?.role;
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
