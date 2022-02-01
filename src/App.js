import './App.scss';
import HomePage from './pages/home/home'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ChatRoom from './pages/room/room';
import Login from './pages/login/login';
import VideoPlayer from './components/video/video';
import VideoTest from './components/video/videoTest';
function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
    <Route path="/" element={<HomePage></HomePage>} ></Route>
    <Route path="/chat/:id" element={<ChatRoom></ChatRoom>}></Route>
    <Route path="/video" element={<VideoTest></VideoTest>}></Route>
    </Routes>
    </div>
  </Router>
  );
}

export default App;
