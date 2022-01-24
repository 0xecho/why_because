// Saves options to chrome.storage
function save_options() {
    var token = document.getElementById('token').value;
    var chat_id = document.getElementById('chat_id').value;
    chrome.storage.sync.set({
      token: token,
      chat_id: chat_id
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      token: "NOT_SET",
      chat_id: "NOT_SET"
    }, function(items) {
      document.getElementById('token').value = items.token;
      document.getElementById('chat_id').value = items.chat_id;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);