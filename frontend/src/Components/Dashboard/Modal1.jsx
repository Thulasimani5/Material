import React from 'react';

const Modal1 = ({ close1, file }) => {
  const handleConfirm = () => {
    file();
    close1();
  };

  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='header1'>
          <h2>CONFIRMATION</h2>
        </div>
        <div>
          <p>Are you sure you want to add this tag?</p>
        </div>
        <div className='footer'>
          <button onClick={close1}>CANCEL</button>
          <button onClick={handleConfirm}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
