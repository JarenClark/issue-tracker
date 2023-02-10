import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchProjects } from "../../rdx/projectSlice";

function ProjectPage() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const projects = useSelector((state) => state.projects.projects);
  const project = useSelector((state) =>
    state.projects.projects.find((x) => x.id == router.query.id)
  );

  useEffect(() => {
    if (projects.length == 0) {
      dispatch(fetchProjects());
    }
  }, []);

  return (
    <>
      <Layout title={project?.title ? `Projects / ${project.title}` : null}>
        {project ? (
          <>
            <div className="p-8">
              <h1>{project.title}</h1>
              <br></br>
              <div>{project.description}</div>
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
