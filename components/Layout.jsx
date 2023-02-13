import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Head from "next/head";
// import {Home} from '@heroicons/react/24/outline'
import {
  HomeIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Layout({ title, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projectsCollapsed, setProjectsCollapsed] = useState(false);
  const router = useRouter();

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const profile = useSelector((state) =>
    state.users?.users.find((x) => x.id == user.id)
  );

  const projects = useSelector((state) => state.projects.projects);
  const sortedprojects = [...projects].sort((a, b) =>
    a.title >= b.title ? 1 : -1
  );

  return (
    <>
      <Head>
        <title>{title ?? "App"}</title>
      </Head>
      <div className="flex w-screen h-screen">
        {/* SIDEBAR */}
        <div className="w-full max-w-xs flex flex-col h-screen justify-between border-r border-zinc-700">
          <div>
            <div className="p-8 border-b border-zinc-700 h-24 relative">
              {/* Welcome {profile ? <>Back, {profile.first_name}</> : ""} */}
              <span>{sidebarCollapsed.toString()}</span>
              <div className="absolute top-0 bottom-0 left-full h-full w-6 flex flex-col justify-center transform -translate-x-1/2">
                <div className="rounded-full overflow-hidden  bg-white text-[#191c34]">
                  <div className={`w-6 h-6 flex justify-center items-center transform duration-200 ${sidebarCollapsed == false && `rotate-180`}`} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                  
                  <ChevronRightIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              {/* NAV ITEMS */}
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link href={"/"}>
                    <div className="flex items-center space-x-2 hover:text-jade transition duration-200">
                      <div className="w-6 h-6">
                        <HomeIcon />
                      </div>
                      <span className="">Home</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    className="flex items-center justify-between space-x-2"
                    onClick={() => setProjectsCollapsed(!projectsCollapsed)}
                  >
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-6 h-6">
                        <FolderIcon />
                      </div>
                      <span>Projects</span>
                    </div>
                    <div
                      className={`w-4 h-4 ${
                        projectsCollapsed ? `` : `rotate-180`
                      }`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                  {!projectsCollapsed && (
                    <ul className="pl-8 flex flex-col space-y-2 my-4">
                      {sortedprojects.map((item, i) => (
                        <li
                          key={i}
                          className="transition duration-200 hover:text-indigo-400"
                        >
                          <Link href={`/projects/${item.id}`}>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
          {user && profile && (
            <div className="p-8 flex items-center space-x-4">
              <div className="rounded-full w-16 h-16 bg-indigo-600 flex items-center font-bold justify-center">
                {profile.first_name.slice(0, 1)}
                {profile.last_name.slice(0, 1)}
              </div>
              <span>
                {profile ? <>{profile.first_name}{" "}{profile.last_name}</> : ""}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col grow">
          {/* HEADER */}
          <div className="w-full border-b h-24 border-zinc-700 p-8 flex items-center justify-between">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="inline-flex  items-center space-x-4">
              <button
                className="border-zinc-700 border p-2 rounded-lg px-4 transition duration-200 hover:bg-indigo-600"
                onClick={() => supabaseClient.auth.signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
          {/* MAIN */}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
