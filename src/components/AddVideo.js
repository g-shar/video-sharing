import React,{useState} from 'react';
import { Storage, API, Auth} from "aws-amplify";
import '../App.css'
const apiName = 'videoapi'
const path = '/video'

const AddVideo = ({toggle, handleToggle, setUploaded, uploaded}) => {
	const [file, setFile] = useState(null)
	const [title, setTitle] = useState('')
	const [error, setErrorMessage] = useState('')
	const [upload, setUpload] = useState('')

	const generateId = () => {
		return Date.now().toString(4).substring(0, 2) + Date.now().toString(9).substring(10);
	}

	const getUser = async () => {
		const user = Auth.currentUserInfo()
		return user
	}

	const uploadFile = async (event) => {
		event.preventDefault()
		try {
			if (title.length === 0) {
				setErrorMessage('Give the video a title')
				setTimeout(() => {
					setErrorMessage('')
				}, 3000)
				return;
			} else if (!file) {
				setErrorMessage('No file is attached')
				setTimeout(() => {
					setErrorMessage('')
				}, 3000)
				return;
			}
			setUpload('Uploading...')
			const userPromise = await getUser()
			const user = userPromise.username
			const newFileName = generateId() + file.name
			const promise = await Storage.put(newFileName, file)
			const videoKey = promise.key
			const videoObject = {
				body: {
					title,
					path: videoKey,
					user
				},
			}
			const newVideo = await API.post(apiName, path, videoObject)
			setUpload('Upload was successful!')
			setUploaded(!uploaded)
			setTimeout(() => {
				setUpload('')
			}, 3000)
			setFile(null)
			setTitle('')
		} catch (error) {
			setErrorMessage('Error uploading file')
			setTimeout(() => {
				setErrorMessage('')
			}, 3000)
			setFile(null)
			setTitle('')
		}
	}

	const chooseFile = (event) => {
		event.preventDefault()
		setFile(event.target.files[0])
	}

	const handleTitleChange = (event) => {
		event.preventDefault()
		setTitle(event.target.value)
	}

	if (toggle) {
		return (
			<div className = "addVideo">
				<form className="addVideo-form">
					<span className="exit" onClick={() => handleToggle()}>
						<svg float="right" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(117, 117, 117)" strokeWidth="2" 
						  strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
							<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
						</svg>
					</span>
					<h1 className="addVideo-title">Upload Video</h1>
					<input className="addVideo-input" type="text" placeholder="Title" onChange={handleTitleChange}></input>
					<input className="addVideo-input" type="file" onChange={chooseFile}
					accept="video/*"></input>
					<p className="errorMessage">{error}</p>
					<button id="addVideo-button" onClick = {uploadFile}>Upload</button>
					<p className="uploadedMessage">{upload}</p>
				</form>
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