import React, { useState } from 'react';
import axios from 'axios';

function Upload({ topicId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        axios.post(`/api/topics/${topicId}/content`, formData)
            .then(response => {
                console.log(response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default Upload;