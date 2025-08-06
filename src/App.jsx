import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Messages from './pages/Messages';
import ChatBox from './pages/ChatBox';
import Connection from './pages/Connection';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Layout from './pages/Layout';
import { useUser } from '@clerk/clerk-react';

function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <Login /> : <Layout />}
      >
        <Route index element={<Feed />} />
       <Route path="messages" element={<Messages />} />
      <Route path="messages/:userId" element={<ChatBox />} />
        <Route path="connections" element={<Connection />} />
        <Route path="discover" element={<Discover />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-post" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
