import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, addComment, deleteComment } from './cs';

const PostPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    const status = useSelector((state) => state.comments.status);
    const error = useSelector((state) => state.comments.error);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ postId, body: comment }));
        setComment('');
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.body}</p>
                    <button onClick={() => dispatch(deleteComment(comment.id))}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default PostPage;

