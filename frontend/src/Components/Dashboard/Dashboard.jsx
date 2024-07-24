import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import './Dashboard.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tags');
        setTags(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  const handleClick = (tag) => {
    navigate('/newpage', { state: { message: tag } });
  };

  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
      <br />
      <button className='add-tag' onClick={() => setIsModalOpen(true)}>Add Tag</button>
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)} addTag={handleAddTag} />
      )}
      <div className="tags">
        <h3>Tags</h3>
        <div className='tag-container'>
          {tags.map((tag, index) => (
            <div key={tag.id || index} className='tag-card' onClick={() => handleClick(tag)}>
              <img src={`http://localhost:5000/${tag.image}`} alt="Tag" onError={(e) => console.log('Image error', e)} />
              <div className='tag-info'>
                <p>{tag.tag}</p>
                <p>Levels: {tag.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
