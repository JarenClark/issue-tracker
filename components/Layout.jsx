import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Head from "next/head";

function Layout({ title, children }) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <>
      <Head>
        <title>{title ?? "App"}</title>
      </Head>
      <div className="flex w-screen h-screen">
        <div className="w-full max-w-sm border-r border-zinc-700">
          <div className="p-8 border-b border-zinc-700">sidebar</div>
          <div className="p-8">
            <Link href={"/"}>
              <span className="hover:text-jade transition duration-200">
                Home
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col grow">
          <div className="w-full border-b border-zinc-700 p-8 flex items-center justify-between">
            <h3>{title}</h3>
            <div className="inline-flex  items-center space-x-4">
              <span>{user?.email} </span>
              <button
                className="border-zinc-700 border p-2"
                onClick={() => supabaseClient.auth.signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
