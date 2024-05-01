import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        image: "",
        upvotes: 0,
        content: "",
    });

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
            }
        };
        fetchPost();
    }, [id]);

    const editPost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Forum")
            .update({ title: post.title, content: post.content, image: post.image })
            .eq("id", id);
        window.location = "/";
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Forum")
            .delete()
            .eq('id', id);
        window.location = "/";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="card">
            <form onSubmit={editPost}>
                <h2>Edit or Delete Post</h2>
                <label htmlFor="title">Enter Title</label>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
                <br />

                <label htmlFor="content">Enter Description</label>
                <input type="text" id="content" name="content" value={post.content} onChange={handleChange} />
                <br />

                <label htmlFor="image">Upload Image</label>
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} />
                <br />

                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
