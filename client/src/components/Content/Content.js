import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Content({ topicId }) {
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`/api/topics/${topicId}/content`)
            .then(response => {
                setContent(response.data);
            });
    }, [topicId]);

    return (
        <div>
            {content.map(item => (
                <div key={item.id}>{item.title}</div>
            ))}
        </div>
    );
}

export default Content;