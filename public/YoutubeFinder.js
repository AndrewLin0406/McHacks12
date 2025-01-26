// Replace with your actual YouTube API key
const YOUTUBE_API_KEY = 'AIzaSyCxoKJsnDtzDFAIRJhzs2g9b38VISIQfMY';

// Function to search YouTube videos based on patient input
function searchYouTubeVideos(condition) {
    // Call YouTube API to search for videos
    const searchQuery = encodeURIComponent(condition);
    const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=5&type=video&key=${YOUTUBE_API_KEY}`;

    fetch(youtubeAPIUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                displayVideos(data.items[1]);
            } else {
                alert("No videos found for the given symptoms.");
            }
        })
        .catch(error => {
            console.error("Error fetching YouTube videos:", error);
            alert("Failed to fetch videos. Please try again.");
        });
}

// Function to display the fetched YouTube videos
function displayVideos(video) {
    const videoContainer = document.getElementById('video-results');
    videoContainer.innerHTML = ''; // Clear previous results

    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
        <h3>${video.snippet.title}</h3>
        <img 
            src="${video.snippet.thumbnails.medium.url}" 
            alt="${video.snippet.title}" 
            style="width: 200px; height: auto;"> <!-- Smaller thumbnail -->
        <br>
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Watch Video</a>
        <hr>
    `;
    videoContainer.appendChild(videoElement);

    /* videos.forEach(video => {
        
    }); */
}


