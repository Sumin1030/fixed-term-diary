import { BlogList, CommentList } from "../component/BlogList";
import BlogPosting from "../component/BlogPosting";
import { useEffect, useState } from "react";
import axios from "axios";

let selectedPostDom = null;
function Blog() {
    const [blogArr, setBlogArr] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const onTitleClick = (e, sq) => {
        setSelectedPost(sq);
        changeSelectedPost(e);
    }

    const changeSelectedPost = (e = null) => {
        // 같은 post 눌렀을 때 새로고침 기능으로 동작하도록 똑같이 다시 불러옴.
        console.log('selectedPostDom', selectedPostDom);
        if(selectedPostDom) selectedPostDom.classList.remove('selected-post');
        if(e) {
            selectedPostDom = e.currentTarget;
            console.log('selectedPostDom 바꿈', selectedPostDom);
            selectedPostDom.classList.add('selected-post');
        }
    }

    const getList = () => {
        axios.get('/api/getBlogList').then((res) => {
            const result = res.data.result;
            const _blogArr = [];
            let idx = 0;
            result.forEach((blog) => {
                const _blog = <BlogList key={idx++} content={blog.TITLE} date={blog.DATE} sq={blog.BLOG_SQ} title='posting' onClick={(e, sq) => onTitleClick(e, sq)}></BlogList>
                _blogArr.push(_blog);
            });
            setBlogArr(_blogArr);
        });
    }

    useEffect(() =>{
        getList();
    }, []);

    const writeNewPosting = () => {
        setSelectedPost('new');
        changeSelectedPost();
    }

    return (
        <div className="blog">
            <div className='posting-list'>
                <BlogList title='new' onClick={() => writeNewPosting()} content=' +  New Post' />
                {blogArr}
            </div>
            <BlogPosting selectedPost={selectedPost}/>
            <CommentList selectedPost={selectedPost}/>
        </div>
    );
}

export default Blog;