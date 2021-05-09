import React,{useState} from 'react';
import Amplify, { Storage, sectionFooter, API } from "aws-amplify";

const apiName = 'videoapi'
const path = '/video'

const AddVideo = ({toggle, handleToggle, handleNewVideo}) => {
	const [file, setFile] = useState(null)
	const [title, setTitle] = useState('')

	const uploadFile = async (event) => {
		event.preventDefault()
		try {
			const videoKey = await Storage.put(file.name, file)
			const videoUrl = await Storage.get(videoKey)
			const videoObject = {
				body: {
					title,
					url: videoUrl
				},
			}
			const newVideo = await API.post(apiName, path, videoObject)
			handleNewVideo(newVideo)
			setFile(null)
			setTitle('')
		} catch (error) {
			console.log('error uploading file')
			setFile(null)
			setTitle('')
		}
	}

	const chooseFile = (event) => {
		event.preventDefault()
		console.log(event.target.files[0])
		console.log('name: ', event.target.files[0].name)
		setFile(event.target.files[0])
	}

	const handleTitleChange = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		setTitle(event.target.value)
	}

	if (toggle) {
		return (
			<div className = "addPost">
				<input type="text" label="Title" onChange={handleTitleChange}></input>
				<input type="file" onChange={chooseFile}
					accept="video/*"></input>
				<button onClick = {uploadFile}>Upload</button>
			</div>
		)
	} else {
		return(
			<>
			</>
		)
	}
}

export default AddVideo;