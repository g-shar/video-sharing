
const Video = ({video}) => {
	return (
		<div className="video-wrapper">
			<h1 className="video-title">{video.title}</h1>
			<p className="video-user">{video.user}</p>
			<p className="video-date">{video.date_posted}</p>
			<video className="video" controls><source src={video.fileUrl}></source></video>
		</div>
	)
}

export default Video;