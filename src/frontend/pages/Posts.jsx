import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostService from "../API/PostService.js";
import {useFetching} from "../hooks/useFetching.js";
import {getPageCount} from "../utils/pages.js";
import {usePosts} from "../hooks/usePosts.js";
import MyButton from "../components/UI/button/MyButton.jsx";
import MyModal from "../components/UI/modal/MyModal.jsx";
import PostForm from "../components/PostForm.jsx";
import PostFilter from "../components/PostFilter.jsx";
import Loader from "../components/UI/loader/Loader.jsx";
import PostList from "../components/PostList.jsx";
import Pagination from "../components/UI/pagination/Pagination.jsx";
import {useObserver} from "../hooks/useObserver.js";


function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))

    })
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(
        () => {
            fetchPosts();
        }, [page, limit]
    )

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }


    return (
        <div className="App pt-2 ">
            <MyButton onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyButton onClick={() => fetchPosts()} className="ms-4">
                Получить посты
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter} limit={limit} setLimit={setLimit}/>
            {postError && <h1>Произошла ошибка ${postError}</h1>}

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты" page={page}
                      totalPages={totalPages}/>
            <div ref={lastElement}/>

            {isPostsLoading &&
                <div className="d-flex justify-content-center align-items-center h-100 mt-5">
                    <Loader/>
                </div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
