// CVSkeleton.tsx
import React from 'react';

export default function CVSkeleton() {
  return (
    <div className="relative text-white max-w-4xl mx-auto animate-pulse">
      <div className="flex justify-end p-3 bg-cv-darkgray">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-6 bg-cv-darkgray">
          <div className="mx-auto w-32 h-32 rounded-full bg-gray-600 mb-6"></div>
          
          <div className="mb-6">
            <div className="h-5 w-32 bg-red-400 mb-4 rounded"></div>
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={`skill-${i}`} className="h-6 w-20 bg-gray-900 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 w-24 bg-red-400 mb-4 rounded"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={`lang-${i}`} className="h-4 w-16 bg-gray-900 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 w-16 bg-red-400 mb-4 rounded"></div>
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={`social-${i}`} className="h-4 w-48 bg-gray-900 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 p-6">
          <div className="h-8 w-64 bg-gray-900 rounded mb-4"></div>
          
          <div className="space-y-2 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={`about-${i}`} className="h-4 w-full bg-gray-900 rounded"></div>
            ))}
          </div>
          
          <div className="mb-8">
            <div className="h-6 w-48 bg-red-400 mb-4 rounded"></div>
            <div className="h-5 w-32 bg-gray-900 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-900 rounded mb-4"></div>
            <div className="space-y-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={`edu-content-${i}`} className="h-4 w-full bg-gray-900rounded"></div>
              ))}
            </div>
            
            <div className="h-5 w-32 bg-gray-900 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-900 rounded mb-4"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={`edu-content2-${i}`} className="h-4 w-full bg-gray-900 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="h-6 w-48 bg-red-400 mb-4 rounded"></div>
            
            <div className="mb-6">
              <div className="h-5 w-56 bg-gray-900 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-900rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={`job1-${i}`} className="h-4 w-full bg-gray-900 rounded"></div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="h-5 w-48 bg-gray-900 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-900 rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={`job2-${i}`} className="h-4 w-full bg-gray-900 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}