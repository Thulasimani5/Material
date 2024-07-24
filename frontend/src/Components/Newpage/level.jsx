import React, { useState } from 'react';
import './level.css';
import axios from 'axios';

const Level = ({ close }) => {
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("");
  const [isModal1Open, setIsModal1Open] = useState(false);

  const handleAddButtonClick = async () => {
    const form1Data = new FormData();
    form1Data.append('content', content);
    form1Data.append('level', level);

    try {
      const res = await axios.post('http://localhost:5000/addlevel', { content, level });
      console.log(res.data);
      close();
    } catch (err) {
      console.error('Error while adding level:', err.response ? err.response.data : err.message);
    }
  };

  const handleClick = () => {
    handleAddButtonClick();
    setIsModal1Open(true);
  };

  return (
    <>
      {!isModal1Open && (
        <div className='modal'>
          <div className='modal-container'>
            <div className='header1'>
              <h2>ADD LEVELS</h2>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor="contentInput">Content Name:</label></td>
                    <td><input
                      id="contentInput"
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="levelInput">Level No :</label></td>
                    <td><input
                      id="levelInput"
                      type="text"
                      required
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='footer'>
              <button onClick={close}>CANCEL</button>
              <button onClick={handleClick}>ADD</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Level;
