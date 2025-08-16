import React from "react";
import { dummyUserData } from "../assets/assets";
import { MapPin, MessageCircle, Plus, UserPen } from "lucide-react";

function UserCart({ user }) {
  const currentUser = dummyUserData;

  const handleFollow = async () => {
    // Follow request logic here
  };

  const isFollowing = currentUser?.following.includes(user._id);
  const isConnected = currentUser?.connections?.includes(user._id);

  return (
    <div
      key={user._id}
      className="p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-xl hover:shadow-lg transition"
    >
      {/* Profile Info */}
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt={user.full_name}
          className="rounded-full w-20 h-20 shadow-md mx-auto object-cover border-2 border-purple-300"
        />
        <p className="mt-4 font-semibold text-lg">{user.full_name}</p>
        {user.username && (
          <p className="text-gray-500 font-light text-sm">@{user.username}</p>
        )}
        {user.bio && (
          <p className="text-gray-600 mt-2 text-center text-sm px-4">
            {user.bio}
          </p>
        )}
      </div>

      {/* Location & Followers */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <MapPin className="w-4 h-4" /> {user.location}
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers.length}</span> Followers
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-4 gap-2">
        {/* Follow Button */}
        <button
          onClick={handleFollow}
          disabled={isFollowing}
          className={`w-full py-2 rounded-md flex justify-center items-center gap-2 text-white cursor-pointer transition active:scale-95 shadow-md ${
            isFollowing
              ? "bg-gray-400"
              : "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 hover:from-indigo-500 hover:via-purple-600 hover:to-pink-600"
          }`}
        >
          <UserPen className="w-4 h-4" /> {isFollowing ? "Following" : "Follow"}
        </button>

        {/* Connect / Message Button */}
        <button
          className={`p-2 rounded-md flex justify-center items-center text-white cursor-pointer transition active:scale-95 shadow-sm
    ${
      isConnected
        ? "bg-green-500 hover:bg-green-600" // Connected হলে সবুজ
        : "bg-blue-500 hover:bg-blue-600" // Connect এর জন্য নীল
    }`}
        >
          {isConnected ? (
            <MessageCircle className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default UserCart;
