import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Card = (props) => {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [timePosted, setTimePosted] = useState("");

    useEffect(() => {
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
        getTimeDifference(new Date(props.createdAt));
    }, [props.createdAt]);

    const upvote = async (event) => {
        setUpvotes(upvotes + 1);
        event.preventDefault();
        await supabase
            .from("Forum")
            .update({upvotes: upvotes + 1})
            .eq("id", props.id);
        window.location = "/";
    };
    
    return (
<div className="Card">
    <Link to={`/post/${props.id}`} key={props.id} className="PostLink">
        <div className="Post">
            <h2>{props.title}</h2>
            <img className="PostImg" src={props.image} />
            <p>{props.content}</p>
            <h5>{upvotes} upvotes</h5>
            <p>{timePosted}</p>
        </div>
        <Link to={`/edit/${props.id}`}><button className="EditButton">Edit Post</button></Link>
        <input className="UpvoteButton" type="submit" value="Upvote 👍" onClick={upvote} />
    </Link>
</div>
    );
};

export default Card;
