  import React, { useState } from 'react';

  const data = [
    {
      id: 1,
      label: "Applications",
      children: [
        {
          id: 2,
          label: "Productivity Suite",
          children: [
            { id: 3, label: "Word Processor" },
            { id: 4, label: "Spreadsheet" },
            { id: 5, label: "Presentation Software" },
          ],
        },
        {
          id: 6,
          label: "Design Tools",
          children: [
            { id: 7, label: "Photo Editor" },
            { id: 8, label: "Vector Graphics Editor" },
            { id: 9, label: "3D Modeling Software" },
          ],
        },
        {
          id: 10,
          label: "Development Tools",
          children: [
            { id: 11, label: "Code Editor" },
            { id: 12, label: "Version Control" },
            { id: 13, label: "API Testing Tool" },
          ],
        },
      ],
    },
    {
      id: 14,
      label: "Users",
      children: [
        {
          id: 15,
          label: "Admin",
          children: [
            { id: 31, label: "Admin Panel" },
            { id: 32, label: "User Management" },
          ],
        },
        {
          id: 16,
          label: "Guest",
          children: [
            { id: 33, label: "Guest Dashboard" },
            { id: 34, label: "Guest Settings" },
          ],
        },
        {
          id: 17,
          label: "Registered User",
          children: [
            { id: 35, label: "User Profile" },
            { id: 36, label: "User Settings" },
          ],
        },
      ],
    },
    {
      id: 18,
      label: "Library",
      children: [
        {
          id: 19,
          label: "Books",
          children: [
            { id: 20, label: "Fiction" },
            { id: 21, label: "Non-fiction" },
            { id: 22, label: "Science Fiction" },
          ],
        },
        {
          id: 23,
          label: "Magazines",
          children: [
            { id: 37, label: "Monthly" },
            { id: 38, label: "Weekly" },
          ],
        },
        {
          id: 24,
          label: "Newspapers",
          children: [
            { id: 39, label: "Local" },
            { id: 40, label: "International" },
          ],
        },
      ],
    },
    {
      id: 25,
      label: "System",
      children: [
        {
          id: 26,
          label: "Settings",
          children: [
            { id: 27, label: "Display" },
            {
              id: 28,
              label: "Sound"
            },
          ],
        },
        {
          id: 41,
          label: "Security",
          children: [
            { id: 42, label: "Firewall" },
            { id: 43, label: "Encryption" },
          ],
        },
      ],
    },
  ];
  
  

  const NestedList = () => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const renderList = (items, level = 0) => {
      if (level > 2) return null; // Limit to 3 levels

      return (
        <ul style={{ listStyleType: 'none', paddingLeft: level * 20 }}>
        {items.map((item) => {
          const isExpanded = expanded[item.id];

          return (
            <li key={item.id} style={{ margin: '5px 0' }}>
              <div
                onClick={() => toggleExpand(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '5px 0',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  paddingLeft: '10px',
                  backgroundColor: '#f9f9f9',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                }}
              >
                <span>📁 {item.label}</span>
                {item.children && (
                  <span style={{ marginRight: '10px' }}>
                    {isExpanded ? '▼' : '▶'}
                  </span>
                )}
              </div>

              {/* Render children if expanded */}
              {isExpanded && item.children && (
                <div style={{ paddingLeft: '20px', borderLeft: '2px solid #ddd' }}>
                  {renderList(item.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      );
    };

    return (
      <div>
        <h2>Nested List Component</h2>
        {renderList(data)}
      </div>
    );
  };

  export default NestedList;