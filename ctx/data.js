
import React, { createContext, useEffect, useState } from "react";
import pb from "../lib/pocketbase";

export const DataContext = createContext()

export const DataContextProvider = (props) => {

    const [projects, setProjects] = useState([])
    const [issues, setIssues] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log(`useEffect mounting from DataContext`)

        async function fetchProjects() {
            const resultList = await pb.collection("projects").getList(1, 5, {});
            setProjects(resultList?.items);
        }

        async function fetchIssues() {
            const resultList = await pb.collection("issues").getList(1, 50, {
                expand: 'project'
            });
            setIssues(resultList?.items);
        }

        async function fetchComments() {
            const resultList = await pb.collection("comments").getList(1, 50, {
                expand: "issue",
            });
            setComments(resultList?.items);
        }
        
        fetchProjects();
        fetchIssues();
        fetchComments();

        return () => {
            console.log(`useEffect unmounting from DataContext`)

        }
    }, [])

    return (
        <DataContext.Provider
            value={{
                projects: projects,
                issues: issues,
                comments: comments,
            }}
        >
            {props.children}
        </DataContext.Provider>
    )

}