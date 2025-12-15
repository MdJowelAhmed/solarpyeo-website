"use client"


import React from 'react';
import { AlertCircle, Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-red-50 p-4 rounded-full">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="text-center mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-slate-900 mb-2">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-3">
              Page Not Found
            </h2>
            <p className="text-slate-600 text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center gap-2  text-white font-medium px-6 rounded-md transition-all duration-200 shadow-lg  py-6 transform hover:-translate-y-0.5">
              <Home className="w-5 h-5" />
              Return Home
            </Button>
         
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Search className="w-5 h-5" />
              <span className="text-sm">
                Try searching for what you need or contact support
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}