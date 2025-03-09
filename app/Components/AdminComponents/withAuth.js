"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decryptData } from "@/app/utils/encryption";

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem("token");
        const encryptedType = localStorage.getItem("type");

        if (!token || !encryptedType) {
          router.push("/auth/signin");
          return;
        }

        // Decrypt the user type
        const userType = decryptData(encryptedType);

        if (!userType || userType !== "admin") {
          router.push("/");
          return;
        }

        setIsAuthorized(true);
      };

      checkAuth();
    }, [router]);

    if (!isAuthorized) {
      return (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
