import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import blogAction from "../actions/blogAction"
import blogTagListAction from "../actions/blogTagListAction"
import Blog from "../components/Blog"
import { Outlet } from "react-router-dom"
import BlogTag from "../components/BlogTag"

const BlogPage = () => {
    const dispatch = useDispatch()
    const {blogList, tagList} = useSelector(state=>state.blog)

    useEffect(()=> {
        // download blog list
        dispatch(blogAction())
        // download tag list
        dispatch(blogTagListAction())
    }, [])

    return (
        <>
            <section id="blog-page" className="flex">
                <div className="page-title">
                    <h1>Blog</h1>
                </div>
                
                    <div className="tag-list">
                        {tagList ? 
                            <BlogTag />
                        : <p>No tags found.</p>
                        }
                    </div>
                
                <div className="blog-list">
                    {blogList ? 
                        blogList.map((blog) => (
                            <div key={blog.id}>
                                <Blog data={blog}/>
                            </div>
                        ))
                    : <p>No posts found.</p>
                    }
                </div>
                <Outlet /> 
            </section>
        </>
    )
}

export default BlogPage