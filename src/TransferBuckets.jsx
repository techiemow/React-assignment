import React, { useState } from 'react';

const TransferBuckets = () => {
  const initialBucket1 = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' , 'Item 6' , 'Item 7' , 'Item 8' , 'Item 9' , 'Item 10'];
  const [bucket1, setBucket1] = useState(initialBucket1);
  const [bucket2, setBucket2] = useState([]);
  const [selectedBucket1, setSelectedBucket1] = useState([]);
  const [selectedBucket2, setSelectedBucket2] = useState([]);

  // Add selected items from Bucket 1 to Bucket 2
  const addSelectedToBucket2 = () => {
    setBucket2([...bucket2, ...selectedBucket1]);
    setBucket1(bucket1.filter(item => !selectedBucket1.includes(item)));
    setSelectedBucket1([]);
  };

  // Remove selected items from Bucket 2 back to Bucket 1
  const addSelectedToBucket1 = () => {
    setBucket1([...bucket1, ...selectedBucket2]);
    setBucket2(bucket2.filter(item => !selectedBucket2.includes(item)));
    setSelectedBucket2([]);
  };

  // Add all items from Bucket 1 to Bucket 2
  const addAllToBucket2 = () => {
    setBucket2([...bucket2, ...bucket1]);
    setBucket1([]);
    setSelectedBucket1([]);
  };

  // Remove all items from Bucket 2 back to Bucket 1
  const addAllToBucket1 = () => {
    setBucket1([...bucket1, ...bucket2]);
    setBucket2([]);
    setSelectedBucket2([]);
  };

  // Toggle selection of individual items in either bucket
  const toggleSelection = (item, selected, setSelected) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Styling for the container, buckets, and buttons
  const containerStyle = {

    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '100vh',
    gap: '40px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };
  
  const bucketStyle = {
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '200px',
    textAlign: 'center',
  };
  
  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };
  
  return (
    <div style={containerStyle}>
      {/* Bucket 1 */}
      <div style={bucketStyle}>
        <h3>Bucket 1</h3>
        <ul style={{ listStyle: "none" ,  }}>
          {bucket1.map(item => (
            <li key={item}>
              <input
                type="checkbox"
                checked={selectedBucket1.includes(item)}
                onChange={() => toggleSelection(item, selectedBucket1, setSelectedBucket1)}
              />
              {item}
            </li>
          ))}
        </ul>
        <button
          style={buttonStyle}
          onMouseOver={e => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={e => (e.target.style.backgroundColor = '#4CAF50')}
          onClick={addSelectedToBucket2}
          disabled={selectedBucket1.length === 0}
        >
          Add Selected to Bucket 2
        </button>
        <button
          style={{ ...buttonStyle, marginTop: '10px' }}
          onMouseOver={e => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={e => (e.target.style.backgroundColor = '#4CAF50')}
          onClick={addAllToBucket2}
          disabled={bucket1.length === 0}
        >
          Add All to Bucket 2
        </button>
      </div>
  
      {/* Bucket 2 */}
      <div style={bucketStyle}>
        <h3>Bucket 2</h3>
        <ul style={{ listStyle: "none" ,  }}>
          {bucket2.map(item => (
            <li key={item}>
              <input
                type="checkbox"
                checked={selectedBucket2.includes(item)}
                onChange={() => toggleSelection(item, selectedBucket2, setSelectedBucket2)}
              />
              {item}
            </li>
          ))}
        </ul>
        <button
          style={buttonStyle}
          onMouseOver={e => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={e => (e.target.style.backgroundColor = '#4CAF50')}
          onClick={addSelectedToBucket1}
          disabled={selectedBucket2.length === 0}
        >
          Remove Selected to Bucket 1
        </button>
        <button
          style={{ ...buttonStyle, marginTop: '10px' }}
          onMouseOver={e => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={e => (e.target.style.backgroundColor = '#4CAF50')}
          onClick={addAllToBucket1}
          disabled={bucket2.length === 0}
        >
          Remove All to Bucket 1
        </button>
      </div>
    </div>
  );
}
export default TransferBuckets;
