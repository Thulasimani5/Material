import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Level from './level';
import axios from 'axios';

const NewPage = () => {
  const location = useLocation();
  const [level, setLevel] = useState([]);
  const [content,setcontent]= useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/addlevel');
        setLevel(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/addcontent');
        setcontent(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      {location.state?.message && (
        <div>
          <p>ID: {location.state.message.id}</p>
          <p>Tag: {location.state.message.tag}</p>
          <p>Objective: {location.state.message.objective}</p>
          <p>Count: {location.state.message.count}</p>
          <img src={`http://localhost:5000/${location.state.message.image}`} alt="" /> 
          <br />
        </div>
      )}
      <button className="add-content" onClick={() => setIsModalOpen(true)}>Add Tag</button>
      {isModalOpen && (
        <Level close={() => setIsModalOpen(false)} />
      )}
      {level.map((lvl, index) => (
        location.state?.message.id === lvl.main_id && (
          <p key={index}>{lvl.content}</p>
        )
      ))}
    </div>
  );
};

export default NewPage;
