'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Blog Admin Panel</h1>
              <div className="space-x-4">
                <Link 
                  href="/blog/admin/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Post
                </Link>
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View Blog
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No blog posts yet.</p>
                <Link 
                  href="/blog/admin/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Post
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Tags
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                              {post.excerpt}
                            </div>
                            {/* Show tags on mobile */}
                            <div className="md:hidden mt-2">
                              {post.tags && post.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <span className="text-xs text-gray-500">
                                      +{post.tags.length - 2} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">No tags</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          {post.tags && post.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No tags</span>
                          )}
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-500">
                          <div>
                            <div>Created: {format(new Date(post.createdAt), 'MMM d, yyyy')}</div>
                            <div>Updated: {format(new Date(post.updatedAt), 'MMM d, yyyy')}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex flex-col sm:flex-row justify-end gap-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center justify-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            >
                              View
                            </Link>
                            <Link
                              href={`/blog/admin/edit/${post.id}`}
                              className="inline-flex items-center justify-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="inline-flex items-center justify-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 