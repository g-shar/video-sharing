import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { API, Storage, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import AddVideo from './components/AddVideo';
import Video from './components/Video';
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
  const [uploaded, setUploaded] = useState(false)



  const fetchVideo = async (video) => {
    const fileUrl = await Storage.get(video.path)
    console.log('fileUrl: ', fileUrl)
    const videoObject = {
      ...video,
      fileUrl
    }
    console.log('video object: ', videoObject)
    return videoObject
  }

  useEffect(() => {
    const getAllVideos = async () => {
      const videoResponse = await API.get('videoapi', '/video', myInit)
      console.log('videoResponse: ',videoResponse)
      if(!videoResponse.Items || videoResponse.Items.length == 0) {
        return  (
          <>
          {toggle ? <AddVideo toggle={toggle} handleToggle={handleToggle} 
          /> : null}
          </>
        )
      }
      const vids = await Promise.all(videoResponse.Items.map(v => fetchVideo(v)))
      console.log('vids: ',vids)
      setVideos(vids)
    }
    getAllVideos()
  }, [uploaded])

  const handleToggle = () => {
    console.log(toggle)
    setToggle(!toggle)
  }

  console.log('videos: ', videos)
  return (
    <>
    <AmplifySignOut />
    <div className="App">
       
      <AddVideo toggle={toggle} handleToggle={handleToggle} setUploaded={setUploaded} uploaded={uploaded}/>
      <button className="addVideo-button" onClick={handleToggle}>Add video</button>
      <div className="feed-wrapper">
        {videos.map(v => <Video key={v.id} video={v} />)}
      </div>
    </div>
    </>
  );
}

export default withAuthenticator(App);
