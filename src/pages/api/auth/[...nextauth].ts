import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          login: profile.login,
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = { ...token };
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
      // {
      //   name: 'Bhavya Tomar',
      //   email:
      //   picture: 'https://avatars.githubusercontent.com/u/58269749?v=4',
      //   sub:
      //   login: 'BhavyaCodes',
      //   id:
      //   image: 'https://avatars.githubusercontent.com/u/58269749?v=4',
      //   iat: 1692573419,
      //   exp: 1695165419,
      //   jti:
      // }
    },
  },
};
export default NextAuth(authOptions);
