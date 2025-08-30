import React, { useState } from 'react';
import {
  User,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pending
} from '../assets/assets';

function Connection() {
  const [currentTab, setCurrentTab] = useState('followers');
  const navigate = useNavigate();

  const dataArray = [
    { label: 'followers', value: followers, icon: User },
    { label: 'following', value: following, icon: UserCheck },
    { label: 'pending', value: pending, icon: UserRoundPen },
    { label: 'connections', value: connections, icon: UserPlus }
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6">
        {/* Title */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Connections
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Manage your Network and Discover New Connections
          </p>
        </div>

        {/* Counts */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 border h-20 w-full border-gray-200 bg-white shadow rounded-md"
            >
              <b>{item.value.length}</b>
              <p className="text-slate-600 text-sm sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start border border-gray-200 rounded-md p-1 bg-white shadow-sm gap-2">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors ${
                currentTab === tab.label
                  ? 'bg-indigo-50 font-medium text-indigo-700'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="capitalize">{tab.label}</span>
              {tab.value.length > 0 && (
                <span className="ml-1 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  {tab.value.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Connections List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {dataArray
            .find((item) => item.label === currentTab)
            ?.value.map((user) => (
              <div
                key={user._id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 bg-white shadow rounded-md"
              >
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="rounded-full w-16 h-16 shadow object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-medium text-slate-700">
                    {user.full_name}
                  </p>
                  <p className="text-slate-500 text-sm">@{user.username}</p>
                  <p className="text-slate-500 text-sm mb-2">
                    {user.bio.slice(0, 30)}...
                  </p>

                  {/* View Profile */}
                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="w-full sm:w-auto px-4 py-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer"
                  >
                    View Profile
                  </button>

                  {/* Following */}
                  {currentTab === 'following' && (
                    <button className="w-full sm:w-auto px-4 py-2 mt-2 text-sm rounded bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 active:scale-95 transition text-white cursor-pointer">
                      Unfollow
                    </button>
                  )}

                  {/* Pending */}
                  {currentTab === 'pending' && (
                    <button className="w-full sm:w-auto px-4 py-2 mt-2 text-sm rounded bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95 transition text-white cursor-pointer">
                      Accept
                    </button>
                  )}

                  {/* Connections */}
                  {currentTab === 'connections' && (
                    <button
                      onClick={() =>
                        navigate(`/messages/${user._id}`)
                      }
                      className="w-full sm:w-auto px-4 py-2 mt-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Connection;
