import React, { useState, useEffect, useRef } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

  // Function to simulate data fetching
  const fetchMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + items.length}` );
      
      
     
      
      setItems(prevItems => [...prevItems, ...newItems]);
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  useEffect(() => {
    fetchMoreData(); // Fetch initial items on component mount
  }, []);

  useEffect(() => {
    // Intersection Observer to load more data when the last item becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Fetch more items when page updates
  useEffect(() => {
    if (page > 1) {
      fetchMoreData();
    }
  }, [page]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px',textAlign:"center", margin: 'auto' }}>
      <h2>Infinite Scroll Example</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '10px', border: '1px solid #ddd', margin: '5px 0' }}>
            {item}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more items...</p>}
      <div ref={observerRef} style={{ height: '10px' }} />
    </div>
  );
};

export default InfiniteScroll;
