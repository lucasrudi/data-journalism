var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 1,
      maxHeight: 1
    }
  }
};

navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

navigator.getMedia (

   // constraints
   {
      video: false,
      audio: true
   },

   // successCallback
   function(localMediaStream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(localMediaStream);
      video.onloadedmetadata = function(e) {
         console.log(e);
      };
   },

   // errorCallback
   function(err) {
    console.log("Ocurrió el siguiente error: " + err);
   }

);