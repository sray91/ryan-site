'use client';

import { useState, useCallback, useEffect } from 'react';

export default function TagInput({ value = [], onChange, placeholder = "Add tags..." }) {
  const [inputValue, setInputValue] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch available tags from API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags');
        if (res.ok) {
          const tags = await res.json();
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Filter suggestions based on input
  const filteredSuggestions = availableTags.filter(tag => 
    tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
    !value.includes(tag.name)
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove last tag if input is empty and backspace is pressed
      removeTag(value.length - 1);
    }
  };

  const addTag = useCallback((tagName = inputValue) => {
    const trimmedValue = tagName.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      const newTags = [...value, trimmedValue];
      onChange({ target: { name: 'tags', value: newTags } });
      setInputValue('');
      setShowSuggestions(false);
    }
  }, [inputValue, value, onChange]);

  const removeTag = useCallback((indexToRemove) => {
    const newTags = value.filter((_, index) => index !== indexToRemove);
    onChange({ target: { name: 'tags', value: newTags } });
  }, [value, onChange]);

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      addTag();
    }, 200);
  };

  const handleSuggestionClick = (tagName) => {
    addTag(tagName);
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[42px]">
        {/* Render existing tags */}
        {value.map((tag, index) => {
          // Find the tag in available tags to get its color
          const tagData = availableTags.find(t => t.name === tag);
          const tagColor = tagData?.color || '#3B82F6';
          
          return (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-sm text-white rounded-md"
              style={{ backgroundColor: tagColor }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                aria-label={`Remove tag: ${tag}`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          );
        })}
        
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onFocus={() => setShowSuggestions(true)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-0 outline-none bg-transparent text-sm"
        />
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {filteredSuggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleSuggestionClick(tag.name)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center px-2 py-1 text-xs text-white rounded-full"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
                {tag.description && (
                  <span className="text-xs text-gray-500">{tag.description}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Help text */}
      <div className="mt-1 text-xs text-gray-500">
        Type a tag and press Enter, comma, or tab to add it. Click the × to remove tags.
        {availableTags.length > 0 && (
          <span className="block">Available tags will appear as suggestions while typing.</span>
        )}
      </div>
    </div>
  );
} 