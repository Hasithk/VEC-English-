import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { APP_ROLES, type AppRole } from '@/lib/roles';
import { findUserByEmail } from '@/lib/user-service';

export { APP_ROLES };
export type { AppRole };

const isAppRole = (value: string): value is AppRole =>
  Object.values(APP_ROLES).includes(value as AppRole);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = await findUserByEmail(email);
        if (!user) {
          return null;
        }

        if (!user.isActive) {
          return null;
        }

        if (!isAppRole(user.role)) {
          return null;
        }

        const isValidPassword = await compare(password, user.passwordHash);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === 'string' ? token.id : '';
        session.user.role = token.role as AppRole;
      }

      return session;
    },
  },
};
