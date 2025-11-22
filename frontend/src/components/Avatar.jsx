import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Avatar({ src, alt }) {
  // Nếu có src thì hiển thị ảnh, chưa có thì dùng icon
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover rounded-full" />
      ) : (
        <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
      )}
    </div>
  );
}
