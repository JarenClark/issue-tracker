import React, { useEffect, useState } from "react";
import { Layout, ProtectedRoute } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchProjects } from "../../rdx/projectSlice";
import format from "date-fns/format";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
function ProjectPage() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const projects = useSelector((state) => state.projects.projects);
  const project = useSelector((state) =>
    state.projects.projects.find((x) => x.id == router.query.id)
  );

  const issues = useSelector((state) =>
    state.issues?.issues?.filter((x) => x.related_project == router.query.id)
  );

  useEffect(() => {
    if (projects.length == 0) {
      dispatch(fetchProjects());
    }
  }, []);

  const tableCols = [
    "Item",
    "Assigned To",
    "Status",
    "Severity",
    "Priority",
    "Created At",
  ];

  return (
    <>
      <ProtectedRoute>
        <Layout title={project?.title ? `Projects / ${project.title}` : null}>
          {project ? (
            <>
              <div className="flex grow">
                <div className="p-8">
                  <h1>{project.title}</h1>
                  <br></br>
                  <div>{project.description}</div>

                  {issues && issues.length > 0 && (
                    <div className="my-8">
                      <table className="table-auto">
                        <thead>
                          <td></td>
                          {tableCols.map((item, i) => (
                            <td
                              className={`text-center border border-zinc-700 py-2 px-6 ${
                                i == 0 && `rounded-l-lg`
                              } ${i + 1 == tableCols.length && `rounded-r-lg`}`}
                              key={i}
                            >
                              {item}
                            </td>
                          ))}
                        </thead>
                        <tbody>
                          {issues.map((item, i) => (
                            <tr key={i}>
                              <td className=" border border-zinc-700">
                                <Link href={`/issues/${item.id}`}>
                                  <div className="px-2">
                                    <div className="w-4 h-4">
                                      <ArrowTopRightOnSquareIcon />
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              {[
                                item.title,
                                "",
                                item.status,
                                item.severity,
                                item.priority,
                                format(new Date(item.created_at), "MM/dd/yyyy"),
                              ].map((cell, j) => (
                                <td
                                  key={j}
                                  className={`${
                                    j == 0 ? `text-left` : `text-center`
                                  } px-6 py-2 border border-zinc-700`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* {issues && issues.length > 0 && (
                    <div className="my-8">
                      <div className="rounded-lg">
                        <div className="flex">
                          {tableCols.map((item, i) => (
                            <div
                              className={`text-center border border-zinc-700 py-3 px-6 ${
                                i == 0 ? `w-80` : `w-32`
                              } ${i + 1 == tableCols.length && `rounded-r-lg`}`}
                              key={i}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                        <div>
                          {issues.map((item, i) => (
                            <div key={i} className="flex items-stretch">
                              {[
                                item.title,
                                "",
                                item.status,
                                item.severity,
                                item.priority,
                                format(new Date(item.created_at), "MM/dd/yyyy"),
                              ].map((cell, j) => (
                                <div
                                  key={j}
                                  className={`${
                                    j == 0 ? ` w-80 text-left` : `w-32 text-center`
                                  } px-4 py-3 border border-zinc-700`}
                                >
                                  {cell}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>

                <div className="p-8 border-l h-full border-zinc-700">
                  <h3 className="font-bold">Recent Activity</h3>
                  <ul></ul>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8">Loading...</div>
          )}
        </Layout>
      </ProtectedRoute>
    </>
  );
}

export default ProjectPage;

// {/* <div className="my-8 p-8 border border-zinc-700 rounded-lg">
//   <h3 className="font-bold">Tasks</h3>

//   <ul>
//     {issues.map((issue, i) => (
//       <li key={i}>
//         <Link href={`/issues/${issue.id}`}>
//           {issue.title}
//         </Link>
//       </li>
//     ))}
//   </ul>
// </div> */}
