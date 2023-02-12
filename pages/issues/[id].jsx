import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchIssues } from "../../rdx/issueSlice";

function ProjectPage() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const issues = useSelector((state) => state.issues.issues);
  const comments = useSelector((state) =>
    state.comments.comments.filter((x) => x.related_issue == router.query.id)
  );
  const issue = useSelector((state) =>
    state.issues.issues.find((x) => x.id == router.query.id)
  );

  useEffect(() => {
    if (issues.length == 0) {
      dispatch(fetchIssues());
    }
  }, []);

  return (
    <>
      <Layout title={issue?.title ? `issues / ${issue.title}` : null}>
        {issue ? (
          <>
            <div className="p-8">
              <h1>{issue.title}</h1>
              <br></br>
              <div>{issue.description}</div>
              {comments && comments.length > 0 && (
                <div className="p-4 border border-zinc-700 rounded-xl my-8 flex flex-col space-y-4">
                  {comments.map((comment, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-4 flex space-x-4 hover:bg-white hover:bg-opacity-5"
                    >
                      <div className="rounded-full  w-10 h-10 flex justify-center items-center bg-zinc-700">
                        JC
                      </div>
                      <div className="p-2">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-8">Loading...</div>
        )}
      </Layout>
    </>
  );
}

export default ProjectPage;
