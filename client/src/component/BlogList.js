import DateUtil from "../util/DateUtil";
import axios from "axios";
import { useEffect, useState } from 'react';

function BlogList(props) {
    const className = `${props.title}`;
    const date = DateUtil.getDate(new Date(props.date).getTime() - new Date(props.date).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);

    const isOnClick = () => {
        const list = [];
        let idx = 1;
        if(props.date) list.push(<div key={idx++} className={`${className}-date`}>{date}</div>);
        if(props.content) list.push(<div key={idx} className={`${className}-title`}>{props.content}</div>);
        return props.onClick ? 
            <div className={'blog-list ' + className} onClick={(e) => props.onClick(e, props.sq)}>{list}</div> :
            <div className={'blog-list ' + className}>{list}</div>
    }

    return isOnClick();
}

function CommentList(props) {
    const [comment, setComment] = useState([]);
    const getComment = () => {
        axios.get(`/api/getBlogComment?sq=${props.selectedPost}`).then((res) => {
            const result = res.data.result;
            const _blogArr = [];
            let idx = 0;
            result.forEach((blog) => {
                const _blog = <BlogList key={idx++} content={blog.CONTENT} date={blog.DATE}id={blog.ID} title='comment'></BlogList>
                _blogArr.push(_blog);
            });
            setComment(_blogArr);
        });
    }

    useEffect(() => {
        if(props.selectedPost) {
            if(props.selectedPost == 'new') {
                setComment(null);
            } else getComment();
        }
    }, [props.selectedPost]);

    return <div className='comment-list'>{comment}</div>;

}

export { BlogList, CommentList };