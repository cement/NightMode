var switcher = false;
var curentCtrl = {token:0,backColor:'#363636',textColor:'#ffffff',linkColor:'#00cccc',linkHover:'#80ff22',hoverBack:'#424242',visited:'#408080',imgOpacity :0.5};
var defultCtrl = {token:3,backColor:'#363636',textColor:'#ffffff',linkColor:'#00cccc',linkHover:'#80ff22',hoverBack:'#424242',visited:'#408080',imgOpacity :0.5};

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            if (callback) callback(response);
        });
    });
}


 chrome.tabs.onUpdated.addListener(function(tabid,info,tab) {
   	   if(switcher){
          chrome.tabs.sendMessage(tabid, Object.assign({token:2},curentCtrl));
   	   }
 });

 