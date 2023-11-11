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

  document.body.addEventListener('htmx:beforeSwap', function(event) {
    if (event.target.id === 'ai-response') {
      event.detail.target.classList.remove('hx-fade-in');
      event.detail.target.classList.add('hx-fade-out');
      return false; // Prevents the default swap
    }
  });

  document.body.addEventListener('htmx:afterSwap', function(event) {
    if (event.target.id === 'ai-response') {
      event.detail.target.classList.remove('hx-fade-out');
      setTimeout(function() {
        event.detail.target.classList.add('hx-fade-in');
      }, 10); // Timeout to allow fade-out to complete
    }
  });