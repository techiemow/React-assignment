import { useState } from 'react';
import BoxSplit from './Boxsplit';
import Game from './Game';
import InfiniteScroll from './InfiniteScroll';
import TransferBuckets from './TransferBuckets';
import NestedList from './NestedListComponent';

function Navigation({ setSelectedComponent }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const hoverStyle = {
    backgroundColor: '#333',
    color: '#fff',
  };

  return (
    <nav style={navStyle}>
      {['TransferBuckets', 'BoxSplit', 'Game', 'InfiniteScroll','NestedList'].map((component) => (
        <button
          key={component}
          onClick={() => setSelectedComponent(component)}
          style={{ ...buttonStyle }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          {component.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}
    </nav>
  );
}

function App() {
  const [selectedComponent, setSelectedComponent] = useState('TransferBuckets');

  const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={appContainerStyle}>
      <Navigation setSelectedComponent={setSelectedComponent} />

      <div style={{ marginTop: '20px' }}>
        {selectedComponent === 'TransferBuckets' && <TransferBuckets />}
        {selectedComponent === 'BoxSplit' && <BoxSplit />}
        {selectedComponent === 'Game' && <Game />}
        {selectedComponent === 'InfiniteScroll' && <InfiniteScroll />}
        {selectedComponent === 'NestedList' && <NestedList/>}
      </div>
    </div>
  );
}

export default App;
