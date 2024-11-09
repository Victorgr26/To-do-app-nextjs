/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { decode, JwtPayload } from "jsonwebtoken";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/signin");
        return;
      }

      try {
        // Decode the token to check expiration
        const decoded = decode(token) as JwtPayload;
        const isExpired =
          decoded && decoded.exp && decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          router.replace("/signin");
          return;
        }
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("token");
        router.replace("/signin");
        return;
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
