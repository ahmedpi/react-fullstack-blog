import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    let BASE_URL = "http://localhost:8000";

    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`${BASE_URL}/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText
        }, {
            headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user &&
                <p> You are posting as {user.email} </p>
            }
            <label>
                <textarea rows="4" cols="50"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div >
    )
}

export default AddCommentForm;