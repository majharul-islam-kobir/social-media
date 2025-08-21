import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, Send } from 'lucide-react'

function ChatBox() {
  const [messages, setMessages] = useState(dummyMessagesData)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user] = useState(dummyUserData)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if (!text.trim() && !image) return

    const newMessage = {
      text,
      message_type: image ? 'image' : 'text',
      media_url: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString(),
      to_user_id: user._id,
    }

    setMessages([...messages, newMessage])
    setText('')
    setImage(null)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    user && (
      <div className='flex flex-col h-screen'>
        {/* Header */}
        <div className='flex items-center gap-2 p-2 md:px-10 xl:pl-24 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300'>
          <img src={user.profile_picture} className='size-8 rounded-full' alt='' />
          <div>
            <p className='font-medium'>{user.full_name}</p>
            <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
          </div>
        </div>

        {/* Messages */}
        <div className='p-5 md:px-10 h-full overflow-scroll'>
          <div className='space-y-4 max-w-4xl mx-auto'>
            {messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.to_user_id !== user._id ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${
                      message.to_user_id !== user._id
                        ? 'rounded-bl-none'
                        : 'rounded-br-none'
                    }`}
                  >
                    {message.message_type === 'image' && (
                      <img
                        src={message.media_url}
                        alt=''
                        className='w-full max-w-sm rounded-lg mb-1'
                      />
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Box */}
        <div className='px-4'>
          <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
            <input
              type='text'
              className='flex-1 outline-none text-slate-700'
              placeholder='Type a message...'
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <label htmlFor='image'>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=''
                  className='h-8 rounded'
                />
              ) : (
                <ImageIcon className='size-7 text-gray-400 cursor-pointer' />
              )}
              <input
                type='file'
                id='image'
                accept='image/*'
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            {/* ✅ Submit Button */}
            <button
              onClick={sendMessage}
              className='p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white rounded-full'
            >
              <Send className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ChatBox
