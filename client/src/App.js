import axios from 'axios';
import './App.css';
import Post from './post';
import Header from './header';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';

const backendUrl = 'https://talksss-ayushroy-117.vercel.app/'; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api`, // Adjust the path if your API is not at the root level
});

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage axiosInstance={axiosInstance} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost axiosInstance={axiosInstance} />} />
          <Route path="/post/:id" element={<PostPage axiosInstance={axiosInstance} />} />
          <Route path="/edit/:id" element={<EditPost axiosInstance={axiosInstance} />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
