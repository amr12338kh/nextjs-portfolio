import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize(credentials) {
      // Check if email and password match admin credentials
      if (
        credentials?.email &&
        credentials?.password &&
        credentials.email === process.env.ADMIN_TEAM_EMAIL &&
        credentials.password === process.env.ADMIN_PASSWORD
      ) {
        return {
          id: "admin-team",
          name: "Admin Team",
          email: credentials.email as string,
          role: "admin",
        };
      }
      return null;
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
    error: "/error",
    signOut: "/signout",
  },
  callbacks: {
    // Verify access for both Google and Credentials providers
    async signIn({ account, profile, credentials }) {
      if (account?.provider === "google") {
        // Only allow your specific email for Google login
        return profile?.email === process.env.OWNER_EMAIL;
      }

      if (account?.provider === "credentials") {
        // Credentials are already verified in authorize callback
        return true;
      }

      return false;
    },

    // Add role to session
    async session({ session }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: "admin",
        },
      };
    },
  },
});
