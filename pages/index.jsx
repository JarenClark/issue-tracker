import React, { useEffect, useState } from "react";
//supbase
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
//redux & state
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../rdx/projectSlice";
import { fetchComments } from "../rdx/commentSlice";
import { fetchIssues } from "../rdx/issueSlice";
import { fetchUsers } from "../rdx/userSlice";
// layout
import { Layout } from "../components";
import Link from "next/link";
import Head from "next/head";

function Home() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      if (allState.issues.issues.length == 0) {
        dispatch(fetchIssues());
      }
      if (allState.projects.projects.length == 0) {
        dispatch(fetchProjects());
      }
      if (allState.comments.comments.length == 0) {
        dispatch(fetchComments());
      }
      if (allState.users?.users.length == 0) {
        dispatch(fetchUsers());
      }
    }
  }, [user]);

  useEffect(() => {
    console.log(`our state is `,{ ...allState });
  }, [allState]);

  if (!user) {
    return (
      <div className="flex h-screen w-screen justify-center items-center overflow-x-scroll">
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
        />
      </div>
    );
  }
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
      <Layout>

        <div className="p-8">
          <div>Projects</div>

          {allState.projects.projects && (
            <ul>
              {allState.projects.projects.map((item, i) => (
                <li key={i}>
                  <Link href={`/projects/${item.id}`}>
                    <span className="hover:text-jade">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <br />
          <div>Issues</div>
          {allState.issues.issues && (
            <ul>
              {allState.issues.issues.map((item, i) => (
                <li key={i}>
                  <Link href={`/issues/${item.id}`}>
                    <span className="hover:text-jade">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <br />
          <div>Comments</div>
          {allState.comments.comments && (
            <ul>
              {allState.comments.comments.map((item, i) => (
                <li key={i}>
                  {item.text}
                  {/* <Link href={`/projects/${item.id}`}>
                  <span className="hover:text-jade">{item.title}</span>
                </Link> */}
                </li>
              ))}
            </ul>
          )}
          <br />
          <div>Users</div>
          {allState.users.users && (
            <ul>
              {allState.users.users.map((item, i) => (
                <li key={i}>
                  {item.first_name} {item.last_name}
                  {/* <Link href={`/projects/${item.id}`}>
                  <span className="hover:text-jade">{item.title}</span>
                </Link> */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;

// async function getProjectsAndPushToState() {
//   console.log("getProjectsAndPushToState");
//   const { data: projects, error } = await supabase.from("projects").select('title, description')
//   // const res = await data.json
//   // console.log('data,error\n',data,error)
//   if(projects) {
//     console.log({...projects},{...error})
//     dispatch(getProjects(projects))
//   }
// }

// useEffect(() => {
//   async function loadData() {
//     const { data: projects, error } = await supabase
//       .from("projects")
//       .select("title, description");
//     setSbData(projects);
//   }
//   loadData();
//   // getProjectsAndPushToState()
// }, []);

//  const { auth } = useSelector(state => state)
// console.log('auth is ', auth)
// const [sessionState, setSessionState] = useState(null); // our session if logged in
// const [loading, setLoading] = useState(true); // loading until supabase get auth

// useEffect(() => {
//   let mounted = true;

//   // check if user is logged in
//   async function getInitialSession() {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     setSessionState(session);
//     setLoading(false);
//   }
//   getInitialSession();

//   const { subscription } = supabase.auth.onAuthStateChange(
//     (_event, session) => {
//       setSessionState(session);
//       setLoading(false);
//     }
//   );

//   console.log(`session state is`, sessionState);
//   return () => {
//     mounted = false;
//     subscription?.unsubscribe();
//   };
// }, []);
