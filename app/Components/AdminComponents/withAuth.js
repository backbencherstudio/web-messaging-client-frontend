"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
