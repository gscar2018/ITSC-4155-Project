import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import { Post } from '../../types.ts';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [clearResults, setClearResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (clearResults) {
      setSearchResults(null);
      setClearResults(false);
    }
  }, [clearResults]);

  useEffect(() => {
    // Clear search results when the location changes (i.e., navigation)
    setClearResults(true);
  }, [location]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      console.log('Searching for posts with tags:', searchQuery);

      const response = await axios.get(`/api/posts/search?tags=${searchQuery}`);
      console.log('Search response:', response.data);
      
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = () => {
    setClearResults(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        style={{
          width: '200px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
      {searchResults === null && !loading && (
        null
      )}
      {searchResults !== null && searchResults.length === 0 && !loading && (
        <div>No result found</div>
      )}
      {searchResults !== null && searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.map((post: Post, index: number) => (
            <NavLink key={post._id} to={`/post/${post._id}`} className="search-result" onClick={handleResultClick}>
              <div className="post">
                <h2 style={{ color: 'blue' }}>Result {index + 1}:</h2>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className="tags">
                  {/* Render tags with spaces */}
                  {post.tags.join(', ')}
                </div>
                {post.image && (
                  <img src={post.image.url} alt="Post" className="post-image" style={{ maxWidth: '150px' }} onError={() => console.error('Error loading image:', post.image.url)} />
                )}
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;