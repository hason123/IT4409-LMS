import React from 'react'

export default function CourseFilters() {
  return (
    <div className="sticky top-24 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bộ lọc:</h3>
      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Danh mục</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-checkbox h-4 w-4 rounded text-primary" type="checkbox"/><span className="text-sm text-gray-600 dark:text-gray-300">Lập trình Web</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-checkbox h-4 w-4 rounded text-primary" type="checkbox"/><span className="text-sm text-gray-600 dark:text-gray-300">Thiết kế UI/UX</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-checkbox h-4 w-4 rounded text-primary" type="checkbox"/><span className="text-sm text-gray-600 dark:text-gray-300">Data Science</span></label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Cấp độ</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-radio h-4 w-4 text-primary" name="level" type="radio"/><span className="text-sm text-gray-600 dark:text-gray-300">Cơ bản</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-radio h-4 w-4 text-primary" name="level" type="radio"/><span className="text-sm text-gray-600 dark:text-gray-300">Trung bình</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-radio h-4 w-4 text-primary" name="level" type="radio"/><span className="text-sm text-gray-600 dark:text-gray-300">Nâng cao</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input className="form-radio h-4 w-4 text-primary" name="level" type="radio"/><span className="text-sm text-gray-600 dark:text-gray-300">Mọi cấp độ</span></label>
        </div>
      </div>

      {/* <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Giá</h4>
        <input className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" max="100" min="0" type="range" value="75"/>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Miễn phí</span>
          <span>Tối đa</span>
        </div>
      </div> */}

      <div>
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Đánh giá</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input checked className="form-radio h-4 w-4 text-primary" name="rating" type="radio"/>
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
            <input className="form-radio h-4 w-4 text-primary" name="rating" type="radio"/>
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

      <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">Apply Filters</button>
    </div>
  )
}
