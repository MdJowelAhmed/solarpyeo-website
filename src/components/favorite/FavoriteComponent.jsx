"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, Download, Share2 } from "lucide-react";
import { useGetFavoriteQuery } from "@/redux/featured/favoriteApi/favoriteApi";
import Spinner from "@/app/(commonLayout)/Spinner";

const FavoriteComponents = () => {
  const { data: favoriteData, isLoading } = useGetFavoriteQuery();
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const favorites = favoriteData?.data || [];

  // Filter favorites based on active tab
  const filteredFavorites = activeTab === "all" 
    ? favorites 
    : favorites.filter(item => item.type === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Downloads</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <Button 
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          All
        </Button>
        <Button 
          variant={activeTab === "video" ? "default" : "outline"}
          onClick={() => setActiveTab("video")}
          className={activeTab === "video" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Videos
        </Button>
        <Button 
          variant={activeTab === "article" ? "default" : "outline"}
          onClick={() => setActiveTab("article")}
          className={activeTab === "article" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Articles
        </Button>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <Image 
            src="/assests/favoritePage.png" 
            alt="No favorites" 
            width={200} 
            height={200} 
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">No downloads yet</h2>
          <p className="text-gray-500 mb-6">You haven't downloaded any content yet</p>
          <Button className="bg-red-600 hover:bg-red-700">
            Browse Content
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={item.thumbnail || "/assests/image15.png"}
                  alt={item.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button size="icon" variant="ghost" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteComponents;