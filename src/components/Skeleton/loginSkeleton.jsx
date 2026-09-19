import React from 'react'
import Login from '../../pages/Login'

const AuthSkeleton = () => {
  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-[#1F232B] rounded-2xl border border-brand-200 dark:border-white/[0.08] animate-pulse space-y-6">
      <div className="space-y-2 text-center flex flex-col items-center">
        <div className="h-6 w-32 bg-gray-200 dark:bg-white/8 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 dark:bg-white/8 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-12 bg-gray-200 dark:bg-white/8 rounded"></div>
          <div className="h-10 w-full bg-gray-200 dark:bg-white/8 rounded-xl"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 dark:bg-white/8 rounded"></div>
          <div className="h-10 w-full bg-gray-200 dark:bg-white/8 rounded-xl"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 dark:bg-white/8 rounded-xl mt-6"></div>
      </div>
    </div>
  );
};

export default AuthSkeleton