import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CourseCard({ title, author, image, rating = 0, reviews }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="material-symbols-outlined !text-base text-yellow-500" style={{ fontVariationSettings: `"FILL" 1` }}>star</span>)
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="material-symbols-outlined !text-base text-yellow-500" style={{ fontVariationSettings: `"FILL" 1` }}>star_half</span>)
    } else {
      stars.push(<span key={i} className="material-symbols-outlined !text-base text-gray-300 dark:text-gray-600">star</span>)
    }
  }

  return (
    <div className="flex h-full w-72 flex-col gap-4 rounded-xl bg-white dark:bg-background-dark shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-lg hover:-translate-y-1 transform transition duration-200">
      <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl flex flex-col" style={{ backgroundImage: `url(${image})` }} />
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-lg font-bold leading-normal text-[#111418] dark:text-white">{title}</p>
          <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">{author}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-sm text-orange-500">{rating ? rating.toFixed(1) : "0.0"}</span>
            <div className="flex">{stars}</div>
            {reviews ? <span className="text-xs text-gray-500 dark:text-gray-400">({reviews})</span> : null}
          </div>
        </div>
        <button className="btn btn-outline w-full text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary/90" aria-label={`Xem chi tiết ${title}`}>
          <span>Xem chi tiết</span>
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
