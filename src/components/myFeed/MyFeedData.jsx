"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Heart, MessageSquare, Share2, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/app/(commonLayout)/Spinner";

const MyFeedData = ({ type = "feed" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for demonstration
  const posts = [
    {
      _id: "1",
      title: "My First Yoga Session",
      content: "Today I tried the morning flow routine and it was amazing! Feeling refreshed and energized.",
      image: "/assests/image15.png",
      likes: 24,
      comments: 5,
      createdAt: "2023-10-15T10:30:00Z",
      tags: ["yoga", "wellness", "morning routine"],
      type: "post"
    },
    {
      _id: "2",
      title: "Meditation Techniques",
      content: "I've been practicing these meditation techniques for a week now and my stress levels have decreased significantly.",
      image: "/assests/image5.png",
      likes: 42,
      comments: 8,
      createdAt: "2023-10-12T14:20:00Z",
      tags: ["meditation", "mindfulness", "stress relief"],
      type: "article"
    },
    {
      _id: "3",
      title: "Evening Wind Down",
      content: "This evening routine helps me sleep better and wake up refreshed. Highly recommend for anyone with sleep issues.",
      image: "/assests/banner.png",
      likes: 18,
      comments: 3,
      createdAt: "2023-10-10T20:15:00Z",
      tags: ["sleep", "evening routine", "relaxation"],
      type: "post"
    }
  ];

  // Filter posts based on active tab
  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.type === activeTab);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDelete = (postId) => {
    // Implement delete functionality
    console.log(`Delete post with ID: ${postId}`);
  };

  const handleEdit = (postId) => {
    // Implement edit functionality
    console.log(`Edit post with ID: ${postId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {type === "feed" ? "My Feed" : "My Posts"}
      </h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger 
            value="all" 
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-red-600 text-white" : ""}
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="post" 
            onClick={() => setActiveTab("post")}
            className={activeTab === "post" ? "bg-red-600 text-white" : ""}
          >
            Posts
          </TabsTrigger>
          <TabsTrigger 
            value="article" 
            onClick={() => setActiveTab("article")}
            className={activeTab === "article" ? "bg-red-600 text-white" : ""}
          >
            Articles
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <Image 
            src="/assests/favoritePage.png" 
            alt="No posts" 
            width={200} 
            height={200} 
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">
            {type === "feed" ? "Your feed is empty" : "You haven't created any posts yet"}
          </h2>
          <p className="text-gray-500 mb-6">
            {type === "feed" ? "Follow topics or users to see content here" : "Share your experiences with the community"}
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            {type === "feed" ? "Discover Content" : "Create Post"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                    <p className="text-gray-500 text-sm">{formatDate(post.createdAt)}</p>
                  </div>
                  
                  {type === "post" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(post._id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(post._id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                
                <p className="mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon">
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

export default MyFeedData;