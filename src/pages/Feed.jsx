import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../component/Loading'
import StoriesBar from '../component/StoriesBar'
import PostCard from '../component/PostCard'
import RecentMessages from '../component/RecentMessages'

function Feed() {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeeds = async () => {
      // future: replace with API call
      setFeeds(dummyPostsData)
      setLoading(false)
    }
    fetchFeeds()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      
      {/* Stories + Posts */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="max-xl:hidden sticky top-0 h-screen overflow-y-auto">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow mb-4">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-full h-40 object-cover rounded-md"
            alt="sponsored"
          />
          <p className="text-slate-600">Email marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with a powerful, easy-to-use platform built for results
          </p>
        </div>

        <RecentMessages />
      </div>
    </div>
  )
}

export default Feed
