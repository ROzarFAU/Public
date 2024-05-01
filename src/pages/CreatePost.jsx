import { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", image: "", upvotes: 0});

    const submitPost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Forum")
            .insert({title: post.title, content: post.content, image: post.image, upvotes: post.upvotes})
            .select();
        window.location = "/"
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="card">
            <h1>Create New Post</h1>
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} placeholder="Title" onChange={handleChange} /> <br />
                <br />

                <label>Content</label> <br />
                <textarea rows="5" type="text" id="content" name="content" value={post.content} placeholder="Content" onChange={handleChange} /> <br />
                <br />

                <label>Image URL</label> <br />
                <input type="text" id="image" name="image" value={post.image} placeholder="Image URL" onChange={handleChange} /> <br />
                <br />

                <input className="create-button" type="submit" value="Create Post" onClick={submitPost} />
            </form>
        </div>
    );
};

export default CreatePost;