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

    useEffect(()=> {
        // console.log(blogList)
    }, [blogList])

    // console.log(blogList)

    return (
        <>
            <section id="blog-page" className="flex">
                <div className="flex page-title"></div>
                <h1>Blog</h1>
                {blogList.posts ? 
                    blogList.posts.map((blog) => (
                        <Blog data={blog}/>
                    ))
                 : <></>
                }
                <Outlet /> 
            </section>
        </>
    )
}

export default BlogPage