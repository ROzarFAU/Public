import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from '../client.js';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [timePosted, setTimePosted] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("Forum")
                .select()
                .eq("id", id)
                .single();
            if (error) {
                throw error;
            }
            if (data) {
                setPost(data);
                const commentsArray = Object.values(data.comments || {}).map((comment, index) => ({
                    id: index,
                    content: comment.comment, 
                    created_time: comment.created_time
                }));
                setComments(commentsArray);
                getTimeDifference(new Date(data.created_at));
            }
        };
        fetchPost();
    }, [id]);

    const getTimeDifference = (createdAt) => {
        const currentTime = new Date();
        const postedTime = new Date(createdAt);
        const difference = currentTime - postedTime;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            setTimePosted(`Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`);
        } else if (days > 0) {
            setTimePosted(`Posted ${days} ${days === 1 ? "day" : "days"} ago`);
        } else if (hours > 0) {
            setTimePosted(`Posted ${hours} ${hours === 1 ? "hour" : "hours"} ago`);
        } else if (minutes > 0) {
            setTimePosted(`Posted ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
        } else {
            setTimePosted("Posted just now");
        }
    };

    const upvote = async (event) => {
        setUpvotes(upvotes + 1);
        event.preventDefault();
        await supabase
            .from("Forum")
            .update({upvotes: upvotes + 1})
            .eq("id", props.id);
        window.location = `/post/${id}`;
    };

    const submitComment = async () => {
        const currentTime = new Date().toISOString();
        const newCommentObject = {
            id: comments.length,
            comment: newComment,
            created_time: currentTime
        };
        const updatedComments = [...comments, newCommentObject];
        await supabase
            .from("Forum")
            .update({ comments: updatedComments })
            .eq("id", post.id);
        setComments(updatedComments);
        setNewComment("");
        window.location = `/post/${id}`;
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div className="card">
            {post &&
                <>
                    <h2>{post.title}</h2>
                    <img className="postImg" src={post.image} />
                    <p>{post.content}</p>
                    <h5>{post.upvotes} upvotes</h5>
                    <p>{timePosted}</p>
                    <Link to={`/edit/${post.id}`}><button className="post-link-button">Edit Post</button></Link>
                    <button className="upvote-button" type="submit" onClick={upvote}>Upvote 👍</button>

                    <div className="comments">
                        <h3>Comments</h3>
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id}>
                                    <p>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="addComment">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Leave a comment..."
                            rows={4}
                            className="comment-textarea"
                        />
                        <br />
                        <button onClick={submitComment} className="submitComment">Submit Comment</button>
                    </div>
                </>
            }
        </div>
    );
};

export default ViewPost;
