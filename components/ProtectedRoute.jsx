import React, { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    if (!user) {
      router.push("/");
    }
  }, []);

  useEffect(() => {

    if (!user) {
      router.push("/");
    }
  }, [user]);
  
  if(loading){
    return <Spinner />
  }
  
  return <>{user && children}</>;
}

export default ProtectedRoute;
