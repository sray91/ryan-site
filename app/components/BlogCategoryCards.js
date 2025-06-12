'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BlogCategoryCards({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: 'Infographics',
      tag: 'infographic',
      image: '/infographic.png',
      description: 'Visual data and information designs',
      aspectRatio: '4/3'
    },
    {
      name: 'Private Equity',
      tag: 'private-equity',
      image: '/private-equity.png',
      description: 'Insights on private equity and investments',
      aspectRatio: '16/9'
    },
    {
      name: 'D&D',
      tag: 'd&d',
      image: '/d&d.png',
      description: 'Adventures and stories from the realm of Dungeons & Dragons',
      aspectRatio: '16/9'
    }
  ];

  const handleCategoryClick = (tag) => {
    const newTag = selectedCategory === tag ? null : tag;
    setSelectedCategory(newTag);
    onCategorySelect(newTag);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => (
        <div
          key={category.tag}
          onClick={() => handleCategoryClick(category.tag)}
          className={`
            cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300
            ${selectedCategory === category.tag 
              ? 'ring-4 ring-blue-500 transform scale-105' 
              : 'hover:transform hover:scale-102'}
          `}
        >
          <div className="relative w-full" style={{ aspectRatio: category.aspectRatio }}>
            <Image
              src={category.image}
              alt={category.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 