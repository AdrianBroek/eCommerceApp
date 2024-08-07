import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import blogAction from "../actions/blogAction"
import Blog from "../components/Blog"
import { Outlet } from "react-router-dom"

const BlogPage = () => {

    const dispatch = useDispatch()
    const {blogList} = useSelector(state=>state.blog)

    useEffect(()=> {
        dispatch(blogAction())
    }, [])

    return (
        <>
            <section id="blog-page" className="flex">
                <div className="page-title">
                    <h1>Blog</h1>
                </div>
                <div className="blog-list">
                {blogList ? 
                    blogList.map((blog, index) => (
                        <Blog key={index} data={blog}/>
                    ))
                 : <></>
                }
                </div>
                <Outlet /> 
            </section>
        </>
    )
}

export default BlogPage