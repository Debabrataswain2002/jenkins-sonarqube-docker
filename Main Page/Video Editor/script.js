const video = document.getElementById("video");
const videoUpload = document.getElementById("videoUpload");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const cropWidthInput = document.getElementById("cropWidth");
const cropHeightInput = document.getElementById("cropHeight");
const audioUpload = document.getElementById("audioUpload");

let originalVideoFile = null;

// 🟢 Load Video
function loadVideo(event) {
    originalVideoFile = event.target.files[0];

    if (originalVideoFile) {
        const videoURL = URL.createObjectURL(originalVideoFile);
        video.src = videoURL;
        video.style.display = "block";
        video.load();
        video.play().catch(error => console.error("Autoplay prevented:", error));
    } else {
        alert("Please select a valid video file.");
    }
}

// ✂ Trim Video
function trimVideo() {
    const startTime = parseFloat(startTimeInput.value) || 0;
    const endTime = parseFloat(endTimeInput.value) || video.duration;

    if (startTime >= endTime) {
        alert("Start time must be less than end time.");
        return;
    }

    video.currentTime = startTime;

    video.addEventListener("timeupdate", function () {
        if (video.currentTime >= endTime) {
            video.pause();
        }
    });
}

// 📏 Crop Video (Placeholder - Canvas Needed for Full Cropping)
function cropVideo() {
    alert("Cropping is a placeholder feature. Full cropping requires server-side processing (FFmpeg).");
}

// 🎵 Add Background Music
function addMusic() {
    const audioFile = audioUpload.files[0];

    if (!audioFile || !originalVideoFile) {
        alert("Please upload both a video and an audio file.");
        return;
    }

    alert("Music added! Note: Proper merging requires FFmpeg for exporting.");
}

// ⬇ Download Video (Placeholder)
function downloadVideo() {
    alert("Video download feature requires server-side processing (FFmpeg).");
}

// 📂 Event Listeners
videoUpload.addEventListener("change", loadVideo);
