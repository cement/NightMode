//var switcher = false;
var curentCtrl = {toggle:false,backColor:'#363636',textColor:'#ffffff',linkColor:'#00cccc',linkHover:'#80ff22',hoverBack:'#424242',visited:'#408080',imgOpacity :0.5};
var defultCtrl = {toggle:true,backColor:'#363636',textColor:'#ffffff',linkColor:'#00cccc',linkHover:'#80ff22',hoverBack:'#424242',visited:'#408080',imgOpacity :0.5};

var menuId = chrome.contextMenus.create({
    title: 'YSH切换模式', // %s表示选中的文字
    contexts: ['page'], // 
    //parentId:mainMenuId,
    // onclick: function(onClickData, tab) {
    	
    // 	//console.log(switcher);
    //     toggleSwitcher();
    //     //sendMessageToContentScript(curentCtrl);
    //     chrome.tabs.sendMessage(tab.id,curentCtrl);
	   //  //chrome.contextMenus.update(menuId,{title: 'YSH白天模式'}, function(){});
   	   
    // }
});
chrome.contextMenus.create({
    title: '切换到夜间模式', // %s表示选中的文字
    contexts: ['page'], // 
    parentId:menuId,
    onclick: function(onClickData, tab) {
    	
    	//console.log(switcher);
        toggleSwitcher(true);
        //sendMessageToContentScript(curentCtrl);
        chrome.tabs.sendMessage(tab.id,curentCtrl);
	    //chrome.contextMenus.update(menuId,{title: 'YSH白天模式'}, function(){});
   	   
    }
});
chrome.contextMenus.create({
    title: '切换到白天模式', // %s表示选中的文字
    contexts: ['page'], // 
    parentId:menuId,
    onclick: function(onClickData, tab) {
        toggleSwitcher(false);
        //sendMessageToContentScript(curentCtrl);
        chrome.tabs.sendMessage(tab.id,curentCtrl);
	    //chrome.contextMenus.update(menuId,{title: 'YSH白天模式'}, function(){});
   	   
    }
});

function toggleSwitcher(toggle) {
    if(toggle){
       return curentCtrl.toggle=toggle;
    }
	return curentCtrl.toggle=!curentCtrl.toggle;
}
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            if (callback) callback(response);
        });
    });
}


 chrome.tabs.onUpdated.addListener(function(tabid,info,tab) {
   	   if(curentCtrl.toggle){
          chrome.tabs.sendMessage(tabid, curentCtrl);
          //chrome.tabs.sendMessage(tabid, Object.assign({token:1},curentCtrl));
   	   }
 });

 