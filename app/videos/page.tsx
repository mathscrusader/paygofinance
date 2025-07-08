"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

const videoTutorials = [
  {
    title: "Getting Started with PayGo Finance",
    description: "Learn how to create your account and make your first purchase",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "5:30",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "How to Buy PAY ID Tokens",
    description: "Step-by-step guide to purchasing PAY ID packages",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "3:45",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Maximizing Your Referral Earnings",
    description: "Tips and strategies to earn more from referrals",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "7:20",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Buying Airtime and Data",
    description: "How to purchase airtime and data bundles",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "4:15",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Understanding PAY ID Benefits",
    description: "Learn about the benefits of different PAY ID levels",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "6:10",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Upgrading Your Account",
    description: "How to upgrade your PAY ID level for better benefits",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "4:50",
    youtubeId: "dQw4w9WgXcQ",
  },
]

export default function VideosPage() {
  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Tutorials</h1>
          <p className="text-gray-600">Learn how to use PayGo Finance with our step-by-step guides</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTutorials.map((video, index) => (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => openYouTubeVideo(video.youtubeId)}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Watch Now
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => openYouTubeVideo(video.youtubeId)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-red-50 border-red-200 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Subscribe to Our Channel</h3>
              <p className="text-red-700 mb-4">Get notified when we upload new tutorials and updates</p>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => window.open("https://www.youtube.com/@paygofinance", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Subscribe on YouTube
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
