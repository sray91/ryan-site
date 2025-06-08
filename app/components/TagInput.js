'use client';

import { useState, useCallback } from 'react';

export default function TagInput({ value = [], onChange, placeholder = "Add tags..." }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  const addTag = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      const newTags = [...value, trimmedValue];
      onChange({ target: { name: 'tags', value: newTags } });
      setInputValue('');
    }
  }, [inputValue, value, onChange]);

  const removeTag = useCallback((indexToRemove) => {
    const newTags = value.filter((_, index) => index !== indexToRemove);
    onChange({ target: { name: 'tags', value: newTags } });
  }, [value, onChange]);

  const handleInputBlur = () => {
    addTag();
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[42px]">
        {/* Render existing tags */}
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-md"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label={`Remove tag: ${tag}`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        ))}
        
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-0 outline-none bg-transparent text-sm"
        />
      </div>
      
      {/* Help text */}
      <div className="mt-1 text-xs text-gray-500">
        Type a tag and press Enter, comma, or tab to add it. Click the × to remove tags.
      </div>
    </div>
  );
} 