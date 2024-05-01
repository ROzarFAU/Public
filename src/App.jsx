import React, { useState, useEffect } from 'react';
import { supabase } from './client.js';
import { Link } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import './App.css';
import CreatePost from './pages/CreatePost.jsx';
import ReadPost from './pages/ReadPost.jsx';
import EditPost from './pages/EditPost.jsx';
import ViewPost from './pages/ViewPost.jsx';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('Forum')
        .select();

      setPosts(data);
    };

    fetchPosts();
  }, []); 

  const handleSearchChange = (event) => { 
    setSearchQuery(event.target.value);
  };

  const element = useRoutes([ 
    {
      path: "/",
      element: <ReadPost posts={posts} />
    },
    {
      path: "/post/:id",
      element: <ViewPost posts={posts} />
    },
    {
      path: "/edit/:id",
      element: <EditPost posts={posts} />
    },
    {
      path: "/new",
      element: <CreatePost />
    }
  ]);

  return (
    <>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <img src="src/images/Logo.png" alt="Logo" className="logo" />
            <h1 className="title">DisMyth</h1>
          </div>
          <div className="navbar-middle">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} 
              placeholder="Search by title"
              className="searchBar"
            />
          </div>
          <div className="navbar-right">
            <Link to="/"><button>Home</button></Link>
          </div>
        </nav>
        {element}
        <div className="createButton">
          <Link to="/new"><button>Create New Post</button></Link>
        </div>
      </div>
    </>
  )
}

export default App;
