import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../component/Loading'
import StoriesBar from '../component/StoriesBar'
import PostCard from '../component/PostCard'

function Feed() {

  const [feeds , setFeeds] = useState ([])
  const [loading , setLoding] = useState (true)

  const fetchFeeds = async () =>{
    setFeeds(dummyPostsData)
    setLoding(false)
  }

  useEffect(() =>{

    fetchFeeds()

  },[] )

  return !loading ?(
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>

      {/* Stories and post list  */}

      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6 '>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post}/> 
          ))}
        </div>
      </div>

      {/* right sideber  */}
      <div>

        <div>
          <h1>Sponsored</h1>
        </div>
          <h1>Recent messages</h1>

      </div>

    </div>
  ) :  <Loading/>
}

export default Feed