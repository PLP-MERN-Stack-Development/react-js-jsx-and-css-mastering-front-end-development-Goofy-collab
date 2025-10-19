import React, { useState, useEffect } from 'react';
import { fetchPosts, searchPosts } from '../api/api';
import Card from '../components/Card';
import Button from '../components/Button';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const postsPerPage = 10;

  // Fetch posts on component mount and when page changes
  useEffect(() => {
    if (!isSearching) {
      loadPosts();
    }
  }, [page, isSearching]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts(page, postsPerPage);
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setPage(1);
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearching(true);
    try {
      const data = await searchPosts(searchQuery);
      setPosts(data);
    } catch (err) {
      setError('Failed to search posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
    <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
  Daily Advice 
</h1>
<p className="text-gray-600 dark:text-gray-400">
  Browse helpful advice and life tips
</p>
    </div>

      {/* Search Form */}
      <Card>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search advice by keyword..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
          {isSearching && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          )}
        </form>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card variant="danger">
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400 font-semibold">
              {error}
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={loadPosts}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      
{!loading && !error && (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.length === 0 ? (
        <Card className="md:col-span-2">
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No quotes found. Try a different search term.
          </p>
        </Card>
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">"</div>
                <p className="text-lg text-gray-800 dark:text-gray-200 italic mb-4">
                  {post.body}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                {post.author && (
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                 — {post.author}
                 </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>


          {/* Pagination */}
          {!isSearching && posts.length > 0 && (
            <Card>
              <div className="flex justify-between items-center">
                <Button
                  variant="secondary"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Page {page}
                </span>
                <Button
                  variant="secondary"
                  onClick={handleNextPage}
                  disabled={posts.length < postsPerPage}
                >
                  Next
                </Button>
              </div>
            </Card>
          )}

          {/* Search Results Info */}
          {isSearching && (
            <Card variant="primary">
              <p className="text-center text-gray-700 dark:text-gray-300">
                Found {posts.length} result{posts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ApiData;