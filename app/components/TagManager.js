'use client';

import { useState, useEffect } from 'react';

export default function TagManager({ isOpen, onClose, onTagsUpdated }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6',
    description: '',
    image: null
  });

  // Predefined color options
  const colorOptions = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280'  // Gray
  ];

  useEffect(() => {
    if (isOpen) {
      fetchTags();
    }
  }, [isOpen]);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tags');
      if (res.ok) {
        const data = await res.json();
        setTags(data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const migrateTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tags/migrate', {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Migration result:', data);
        fetchTags(); // Refresh tags after migration
        onTagsUpdated?.();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to migrate tags');
      }
    } catch (error) {
      console.error('Error migrating tags:', error);
      alert('Failed to migrate tags');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchTags();
        resetForm();
        onTagsUpdated?.();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save tag');
      }
    } catch (error) {
      console.error('Error saving tag:', error);
      alert('Failed to save tag');
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag.id);
    setFormData({
      name: tag.name,
      color: tag.color,
      description: tag.description,
      image: tag.image
    });
  };

  const handleDelete = async (tagId, tagName) => {
    if (!confirm(`Are you sure you want to delete the tag "${tagName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/tags?id=${tagId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchTags();
        onTagsUpdated?.();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete tag');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      alert('Failed to delete tag');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      color: '#3B82F6',
      description: '',
      image: null
    });
    setEditingTag(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

          // Validate file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert('Image size must be less than 4MB');
        return;
      }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Validate dimensions
        if (img.width !== 1280 || img.height !== 720) {
          if (confirm(`Image dimensions are ${img.width}x${img.height}. Required dimensions are 1280x720. Do you want to resize it automatically?`)) {
            resizeImage(img, 1280, 720);
          }
        } else {
          // Image is correct dimensions, use as is
          setFormData(prev => ({
            ...prev,
            image: event.target.result
          }));
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (img, targetWidth, targetHeight) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Draw and resize the image
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    // Convert to base64
    const resizedImage = canvas.toDataURL('image/jpeg', 0.9);
    
    setFormData(prev => ({
      ...prev,
      image: resizedImage
    }));
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Manage Tags</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add/Edit Tag Form */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              {editingTag ? 'Edit Tag' : 'Add New Tag'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter tag name..."
                  />
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex flex-wrap gap-1">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color }))}
                          className={`w-6 h-6 rounded-full border-2 ${
                            formData.color === color ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional description..."
                />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image (1280x720px)
                </label>
                <div className="space-y-3">
                  {formData.image ? (
                    <div className="relative">
                      <img 
                        src={formData.image} 
                        alt="Tag preview" 
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 4MB</p>
                      <p className="text-xs text-gray-500">Recommended: 1280x720px</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingTag ? 'Update Tag' : 'Create Tag'}
                </button>
                {editingTag && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tags List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Existing Tags</h3>
              {tags.length === 0 && (
                <button
                  onClick={migrateTags}
                  disabled={loading}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? 'Loading...' : 'Add Default Tags'}
                </button>
              )}
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading tags...</p>
              </div>
            ) : tags.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No tags created yet.</p>
                <p className="text-sm text-gray-400">Click &quot;Add Default Tags&quot; to populate with your blog categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div key={tag.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center px-2 py-1 text-sm rounded-full text-white"
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                        </span>
                        {tag.image && (
                          <span className="text-xs text-gray-500">📷</span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(tag)}
                          className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                          title="Edit tag"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id, tag.name)}
                          className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
                          title="Delete tag"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {tag.description && (
                      <p className="text-sm text-gray-600">{tag.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 