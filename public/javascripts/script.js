document.body.addEventListener('htmx:beforeRequest', function(event) {
    if (event.target.id === 'ai-interaction-form') {
      document.getElementById('btnSend').disabled = true;
    }
});

document.body.addEventListener('htmx:afterRequest', function(event) {
    if (event.target.id === 'ai-interaction-form') {
      document.getElementById('user-input').value = '';
    }
});

document.getElementById('user-input').addEventListener('input', function() {
    const textAreaContent = this.value.trim();
    const sendButton = document.getElementById('btnSend');
    sendButton.disabled = textAreaContent.length === 0;
  });

  document.getElementById('audioPlayer'); //TODO use this to play the audio file from api

  /**
   * 
   * @param {*} event 
   */
  function handleOnDataAvailable(event, audioChunks) {
    audioChunks.push(event.data);
  }

  /**
   * 
   */
  function handleRecordedAudio() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    // You can now send this audioBlob to your server or play it using an audio element  
  };
/*
  document.getElementById('btnStartVerbalInterview').addEventListener('click', function() {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true }) //TODO: Notify the user in advance the app will request permission to record
        .then(function(stream) {
            // You now have access to the user's microphone
            // TODO: UX -> show the user you're listening
            console.log('Microphone access granted');
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => handleOnDataAvailable(event,audioChunks);
            mediaRecorder.onstop = handleRecordedAudio
            mediaRecorder.start();

            mediaRecorder.stop();
        })
        .catch(function(err) {
            console.error('Error accessing the microphone', err);
            // Handle the error, inform the user they need to allow microphone access
        });
});
*/
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
  recognition = new SpeechRecognition();
} else {
  // Handle the case where the browser doesn't support Web Speech API
  console.error("Your browser does not support the Web Speech API");
}

// Set the properties for the recognition
recognition.continuous = true; // Whether the speech recognition should continue even after a pause
recognition.lang = 'en-US'; // Set the language


function startRecognition() {
  recognition.start();
  hideStartRecognitionBtn();
  showStopListeningBtn();
}

function stopRecognition() {
  recognition.stop();
  showStartRecognitionBtn();
  hideStopListeningBtn();
}

function showStartRecognitionBtn(){
  let btn = document.getElementById('btnStartSpeechRecog');
  btn.style.display = 'block';
}

function hideStartRecognitionBtn() {
  let btn = document.getElementById('btnStartSpeechRecog');
  btn.style.display = 'none';
}

function showStopListeningBtn(){
  let btn = document.getElementById('btnStopSpeechRecog');
  btn.style.display = 'block';
}

function hideStopListeningBtn() {
  let btn = document.getElementById('btnStopSpeechRecog');
  btn.style.display = 'none';
}

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  var txtbox = document.getElementById('user-input')
  txtbox.value = txtbox.value + transcript;
  // For example, send it to the server for further processing
};

  