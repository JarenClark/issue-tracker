import React, { useEffect, useState } from "react";
import { Layout, ProtectedRoute } from "../../components";
import { useDispatch, useSelector, Spinner } from "react-redux";
import { useRouter } from "next/router";
import { fetchIssues } from "../../rdx/issueSlice";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { formatRelative } from "date-fns";
import { useUser } from "@supabase/auth-helpers-react";
import { postNewComment } from "../../rdx/commentSlice";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";

function IssuePage() {
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);

  const user = useUser();
  const { register, handleSubmit, reset, error } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const issue = useSelector((state) =>
    state.issues?.issues.find((x) => x.id == router.query.id)
  );

  const comments = useSelector((state) =>
    state.comments.comments.filter((x) => x.related_issue == router.query.id)
  );

  const related_project = useSelector((state) =>
    state.projects.projects.find((x) => x.id == issue.related_project)
  );

  async function postNewComment(data) {
    console.log(data);
    let obj = {
      text: data.text,
      created_by: user.id,
      created_at: new Date().toISOString(),
      related_issue: router.query.id,
      parent_comment: replyingTo,
    };

    try {
      dispatch(postNewComment(obj));
    } catch (error) {
      alert(error);
    }

    reset();
  }

  return (
    <>
      <ProtectedRoute>
        <Layout title={issue?.title ? `Issue / ${issue.title}` : null}>
          {issue ? (
            <>
              <div className="p-8 container">
                <h1>
                  <span>{issue.title}</span>
                  {related_project && (
                    <>
                      {" "}
                      on{" "}
                      <Link href={`/projects/${related_project.id}`}>
                        {related_project.title}
                      </Link>
                    </>
                  )}
                </h1>
                <div>{issue.description}</div>
                {comments && comments.length > 0 && (
                  <Comments
                    comments={comments}
                    replyingTo={replyingTo}
                    setReplyingTo={setReplyingTo}
                  />
                )}
                <div>
                  {replyingTo && (
                    <div className="flex items-start space-x-2 my-2">
                      <p>
                        <span>Replying to:</span> <br />
                        <span className="font-mono text-sm bg-black">
                          {[...comments].find((x) => x.id == replyingTo).text}
                        </span>
                      </p>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="rounded-full"
                      >
                        <div className="w-4 h-4">
                          <XMarkIcon />
                        </div>
                      </button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit(postNewComment)}>
                    <input
                      type="text"
                      {...register("text")}
                      className="rounded-lg p-1 bg-transparent border border-zinc-700"
                    />
                    <button type="submit">
                      <div className="w-4 h-4">
                        <PaperAirplaneIcon />
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </Layout>
      </ProtectedRoute>
    </>
  );
}

function Comments({ comments, replyingTo, setReplyingTo }) {
  return (
    <>
      <ul className=" my-8 flex flex-col space-y-4">
        {comments.map((comment, i) => (
          <>
            {comment.parent_comment == null && (
              <div key={i} className="border border-zinc-700 rounded-lg p-4">
                <Comment
                  key={i}
                  comment={comment}
                  comments={comments}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                />
              </div>
            )}
          </>
        ))}
      </ul>
    </>
  );
}

function Comment({ comment, comments, replyingTo, setReplyingTo }) {
  const colors = ["bg-blue-500", "bg-red-500", "bg-indigo-500"];
  const user = useSelector((state) =>
    state.users.users.find((x) => x.id == comment.created_by)
  );

  const childComments = comments.filter((x) => x.parent_comment == comment.id);

  return (
    <li className="">
      <div className="flex space-x-2 items-center justify-between">
        <div className="inline-flex items-center space-x-2">
          <div
            className={`rounded-full text-sm font-mono w-10 h-10 flex justify-center items-center ${
              colors[Math.floor(Math.random() * colors.length)]
            }`}
          >
            {user ? (
              <>
                {user.first_name.slice(0, 1)}
                {user.last_name.slice(0, 1)}
              </>
            ) : (
              <>...</>
            )}
          </div>
          {user ? (
            <p className="text-sm">
              {user.first_name} {user.last_name}
            </p>
          ) : (
            <p className="text-sm">Anonymous...</p>
          )}
        </div>
        <div className="text-sm text-blue-500">
          {formatRelative(new Date(comment.created_at), new Date())}
        </div>
      </div>

      <div className="py-1 pl-8  relative">
        <div
          onClick={() => setReplyingTo(comment.id)}
          className="px-4 mb-4 flex group cursor-pointer justify-between"
        >
          <p>{comment.text}</p>
          <div
            className={`group-hover:block ${
              comment.id != replyingTo && `hidden`
            } w-4 h-4`}
          >
            <ArrowUturnRightIcon />
          </div>
        </div>

        <ul className="my-2">
          {childComments.map((child, i) => (
            <>
              <Comment
                comment={child}
                key={i}
                comments={comments}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
              />
            </>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default IssuePage;
