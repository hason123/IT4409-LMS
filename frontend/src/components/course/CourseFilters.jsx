import React, { useState } from 'react'

export default function CourseFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    categories: [],
    level: '',
    rating: '4.5'
  });

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const categories = checked 
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value);
      return { ...prev, categories };
    });
  };

  const handleLevelChange = (e) => {
    const level = e.target.value;
    setFilters(prev => ({ ...prev, level }));
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setFilters(prev => ({ ...prev, rating }));
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="sticky top-24 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bộ lọc:</h3>
      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Danh mục</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-checkbox h-4 w-4 rounded text-primary" 
              type="checkbox"
              value="web"
              checked={filters.categories.includes('web')}
              onChange={handleCategoryChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Lập trình Web</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-checkbox h-4 w-4 rounded text-primary" 
              type="checkbox"
              value="ui-ux"
              checked={filters.categories.includes('ui-ux')}
              onChange={handleCategoryChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Thiết kế UI/UX</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-checkbox h-4 w-4 rounded text-primary" 
              type="checkbox"
              value="data-science"
              checked={filters.categories.includes('data-science')}
              onChange={handleCategoryChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Data Science</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Cấp độ</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-radio h-4 w-4 text-primary" 
              name="level" 
              type="radio"
              value="beginner"
              checked={filters.level === 'beginner'}
              onChange={handleLevelChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Cơ bản</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-radio h-4 w-4 text-primary" 
              name="level" 
              type="radio"
              value="intermediate"
              checked={filters.level === 'intermediate'}
              onChange={handleLevelChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Trung bình</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-radio h-4 w-4 text-primary" 
              name="level" 
              type="radio"
              value="advanced"
              checked={filters.level === 'advanced'}
              onChange={handleLevelChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Nâng cao</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              className="form-radio h-4 w-4 text-primary" 
              name="level" 
              type="radio"
              value="all"
              checked={filters.level === 'all'}
              onChange={handleLevelChange}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Mọi cấp độ</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Đánh giá</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              checked={filters.rating === '4.5'} 
              onChange={handleRatingChange}
              value="4.5"
              className="form-radio h-4 w-4 text-primary" 
              name="rating" 
              type="radio"
            />
            <div className="flex items-center">
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 0.5"}}>star_half</span>
              <span className="text-sm ml-2 text-gray-600 dark:text-gray-300">4.5 &amp; Up</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              checked={filters.rating === '4.0'} 
              onChange={handleRatingChange}
              value="4.0"
              className="form-radio h-4 w-4 text-primary" 
              name="rating" 
              type="radio"
            />
            <div className="flex items-center">
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined !text-lg text-gray-300">star</span>
              <span className="text-sm ml-2 text-gray-600 dark:text-gray-300">4.0 &amp; Up</span>
            </div>
          </label>
        </div>
      </div>

      <button 
        onClick={handleApplyFilters}
        className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}
