import GoogleProvider from "next-auth/providers/google";
import { authenticate, googleAuthenticate } from "@/services/authService";
import { AuthOptions, DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuth2Client } from "google-auth-library";
import Account from "../mw/Accounts";
// import Providers from "next-auth/providers";

const googleAuthClient = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
  "https://selfpublishingtitans.com/api/auth/callback/googleonetap"
);

// This helper function will allows us to get the domain name regardless of its form
// beta.example.com => example.com
// example.com/* => example.com
// localhost:3000 => localhost
const getDomainWithoutSubdomain = (url) => {
  const urlParts = new URL(url).hostname.split(".");

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join(".");
};

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = getDomainWithoutSubdomain(process.env.NEXTAUTH_URL);

// Define how we want the session token to be stored in our browser
const cookies: any = {
  sessionToken: {
    name: `${cookiePrefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: useSecureCookies,
      domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
    },
  },
};

interface OneTapCredentials {
  credential: string;
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  useSecureCookies,
  cookies,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User> {
        if (typeof credentials !== "undefined") {
          try {
            const res = await authenticate(
              credentials.email,
              credentials.password
            );
            const info = await Account.getInfo(res.token);
            if (info.simple === true) {
              res.user = info.full.data;
            }

            return { ...res.user, token: res.token };
          } catch (error) {
            throw new Error(error);
          }
        } else {
          throw new Error("No credentials");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,

      // This is the URL that Google will redirect to after authentication
    }),

    // googleProvider one-tap
    CredentialsProvider({
      // We will use this id later to specify for what Provider we want to trigger the signIn method
      id: "googleonetap",
      name: "google-one-tap",

      // This means that the authentication will be done through a single credential called 'credential'
      credentials: {
        credential: { type: "text" },
      },

      // This function will be called upon signIn
      async authorize(credentials, req): Promise<User> {
        // These next few lines are simply the recommended way to use the Google Auth Javascript API as seen in the Google Auth docs
        // What is going to happen is that t he Google One Tap UI will make an API call to Google and return a token associated with the user account
        // This token is then passed to the authorize function and used to retrieve the customer information (payload).
        // If this doesn't make sense yet, come back to it after having seen the custom hook.

        // const { tokens } = await googleAuthClient.getToken(code);
        const token = (credentials as unknown as OneTapCredentials).credential;
        if (token && typeof token !== "undefined") {
          const ticket = await googleAuthClient.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            maxExpiry: 60 * 60 * 24 * 30, // 30 days
          });
          const payload = ticket.getPayload();
          if (!payload) {
            throw new Error("Cannot extract payload from signin token");
          }

          const {
            email,
            sub,
            given_name,
            family_name,
            email_verified,
            picture: image,
          } = payload;
          if (!email) {
            throw new Error("Email not available");
          }
          const res = await googleAuthenticate(token);

          // The authorize function must return a user or null
          // return user;
          const user = {
            id: sub,
            email,
            name: [given_name, family_name].join(" "),
            image,
            token: res.token,
            ...payload,
          };
          console.log("user in authorize", user);
          return user;
        } else {
          throw new Error("No credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async session({ session, user, token }) {
      if (token && token.exp) {
        // check if token expired
        if ((token?.exp as number) < Date.now() / 1000) {
          return null;
        }
      }

      if (token.token) {
        const info = await Account.checkToken(token.token);
        if (info.simple === true) {
          if (info.full === "Unauthorized") {
            return null;
          }
        } else {
          return null;
        }
      }
      return { ...session, ...user, ...token };
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async redirect({ url, baseUrl }) {
      // // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`;
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      // return baseUrl;

      return url;
    },
  },
};
