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

  