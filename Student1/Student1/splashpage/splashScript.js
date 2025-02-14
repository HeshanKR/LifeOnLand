document.addEventListener("DOMContentLoaded", function() {
  
  // Find the video element by its ID "videoPlayer".
  const videoPlayer = document.getElementById("videoPlayer");
  
  // Add an event listener to the video element for the "canplaythrough" event,
  // which fires when the video can be played all the way through without buffering.
  videoPlayer.addEventListener("canplaythrough", function() {
      
      // When the video is ready, display the "Text-content" element.
      document.getElementById("Text-content").style.display = "block";
  });
});