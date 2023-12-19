import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios.get('/api/topics')
            .then(response => {
                setTopics(response.data);
            });
    }, []);

    return (
        <div>
            {topics.map(topic => (
                <div key={topic.id}>{topic.title}</div>
            ))}
        </div>
    );
}

export default Sidebar;