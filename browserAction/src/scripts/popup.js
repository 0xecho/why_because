document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send_to_telegram').addEventListener('click', function() {    
        // get token from chrome storage, 
        chrome.storage.sync.get({
            token: "NOT_SET",
            chat_id: "NOT_SET"
        }, function(items) {
            if(items.token == "NOT_SET" || items.chat_id == "NOT_SET") {
                alert("Please set your token and chat_id by right clicking on the extension icon and selecting 'Options'");
                return;
            }
            // replace button with spinner
            var button = document.getElementById('send_to_telegram');
            button.innerHTML = '<img src="icons/spinner.gif" />';
            button.disabled = true;
            // get current tab url
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var url = tabs[0].url;
                // send url to telegram
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.telegram.org/bot" + items.token + "/sendMessage", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        // close popup
                        window.close();
                    }
                }

                xhr.send(JSON.stringify({
                    "text": url,
                    "chat_id": items.chat_id
                }));
                
            });
        });
    });
});

