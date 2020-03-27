const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const videoLength = document.getElementById('videoLength');
const volume = document.getElementById('volume');
const volumeBtn = document.getElementById('volume-btn');
const inputVideo = document.getElementById('new-video');

// Play & pause video
function toggleVideoStatus() {
    // Get minutes
    let mins = Math.floor(video.duration / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    // Get seconds
    let secs = Math.floor(video.duration % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    videoLength.innerHTML = `/${mins}:${secs}`;
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// update play/pause icon
function updatePlayIcon() {

    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// Update progress & timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
    video.currentTime = (parseInt(progress.value) * video.duration) / 100;
}

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// toggle volume

const toggleVolume = _ => {
    const currentVolume = volume.value;
    if (currentVolume < 0.1) {
        video.volume = 0.5;
        volume.value = 0.5;
        volumeBtn.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
    } else {
        video.volume = 0;
        volume.value = 0;
        volumeBtn.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
    }
};

const handleNewVideo = (newVideo) => {
    // const newVideo = inputVideo.value;
    video.setAttribute('src', newVideo);
};

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

inputVideo.addEventListener('change', (e) => {
    handleNewVideo(e.target.value);
});

volume.addEventListener('change', e => {
    const currentVolume = e.target.value;
    video.volume = currentVolume;
    if (currentVolume >= 0.1 && currentVolume < 0.5) {
        volumeBtn.innerHTML = '<i class="fa fa-volume-down fa-2x"></i>';
    } else if (currentVolume < 0.1) {
        volumeBtn.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
    }
});

volumeBtn.addEventListener('click', () => {
    toggleVolume();
});

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);