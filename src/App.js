import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Storage, API } from "aws-amplify";
import awsExports from "./aws-exports";
import AddVideo from './components/AddVideo'
Amplify.configure(awsExports);

const apiName = 'videoapi'
const path = '/video'
const myInit = {
  body: {},
}

const App = () => {
  const [videos, setVideos] = useState([])
  const [toggle, setToggle] = useState(false)
  const [file, setFile] = useState(null)
  useEffect(() => {
    const getAllVideos = async () => {
      const videos = await API.get('videoapi', '/video', myInit)
      console.log(videos)
      setVideos(videos)
    }
    getAllVideos()
  }, [])

  const handleToggle = () => {
    console.log(toggle)
    setToggle(!toggle)
  }

  const handleNewVideo = (newVideo) => {
    setVideos(videos.concat(newVideo))
  }
  
  return (
    <div className="App">
      <button onClick={handleToggle}>Add video</button>
      {toggle ? <AddVideo toggle={toggle} handleToggle={handleToggle} 
                handleNewVideo={handleNewVideo}/> : null}
      {videos.map(v => <video className="video">
        <source src={v.url}></source>
      </video>)}
    </div>
  );
}

export default withAuthenticator(App);
