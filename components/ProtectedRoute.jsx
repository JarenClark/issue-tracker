import React, { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

function ProtectedRoute({ children }) {
  const user = useUser();
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  return <>{user && children}</>;
}

export default ProtectedRoute;
