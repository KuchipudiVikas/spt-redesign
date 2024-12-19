import { useEffect, useRef } from "react";
import formbricks from "@formbricks/js/app";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function FormbricksProvider() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isInit = useRef(false);
  useEffect(() => {
    if (status === "unauthenticated") {
      return;
    }
    const handleRouteChange = formbricks?.registerRouteChange;

    const initFormBricks = async () => {
      console.log("initFormBricks");
      await formbricks.init({
        environmentId: process.env.NEXT_PUBLIC_SURVEY_API_KEY,
        apiHost: "https://survey.selfpublishingtitans.com",
        userId: session.user.email,
      });
      isInit.current = true;
      router.events.on("routeChangeComplete", handleRouteChange);
    };

    const setUserAttributes = async () => {
      const email = session?.user?.email;
      if (email) {
        await formbricks.setEmail(email);
      }
    };

    const logOut = async () => {
      // If the user is not signed in, we need to logout from Formbricks
      // but this causes it to be un-inited, so we need to init it again
      await formbricks.logout();
      await initFormBricks();
    };

    const configureFormbricks = async () => {
      if (!isInit.current) {
        await initFormBricks();
      }

      if (isInit.current && status === "authenticated") {
        setUserAttributes();
      }

      if (isInit.current && !session) {
        logOut();
      }
    };

    if (
      status === "authenticated" &&
      session &&
      session.user &&
      session.user.email
    ) {
      configureFormbricks();
    }
  }, [session, status]);

  return null;
}
