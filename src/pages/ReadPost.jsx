import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; 

const ReadPosts = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        const fetchPosts = async () => {
            let query = supabase
                .from("Forum")
                .select();
            if (sortBy === "newest") {
                query.order("created_at", { ascending: false });
            } else if (sortBy === "popular") {
                query.order("upvotes", { ascending: false });
            }
            const { data } = await query;
            setPosts(data);
        };
        fetchPosts();
    }, [sortBy]);

    const filteredPosts = searchQuery ? posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

    return (
        <div>
            <div className="sortButton">
                <button className={`sort-button ${sortBy === "newest" ? "active" : ""}`} onClick={() => setSortBy("newest")}>Newest</button>
                <button className={`sort-button ${sortBy === "popular" ? "active" : ""}`} onClick={() => setSortBy("popular")}>Most Popular</button>
            </div>
            <div className="ReadPosts">
                {
                    filteredPosts && filteredPosts.length > 0 ?
                    filteredPosts.map((post) =>
                        <Card 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            image={post.image}
                            content={post.content}
                            upvotes={post.upvotes}
                            createdAt={post.created_at}
                        />
                    ) : <h2>{'No Submissions Yet 😞'}</h2>
                }
            </div>
        </div>
    );
};

export default ReadPosts;
