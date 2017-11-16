//var switcher = false;
var back = (function() {
    var curentCtrl = { toggle: false, backColor: '#1f1f1f', textColor: '#ffffff', linkColor: '#00cccc', linkHover: '#80ff22', hoverBack: '#424242', visited: '#408080', imgOpacity: 0.5 };
    var defultCtrl = { toggle: true, backColor: '#1f1f1f', textColor: '#ffffff', linkColor: '#00cccc', linkHover: '#80ff22', hoverBack: '#424242', visited: '#408080', imgOpacity: 0.5 };

    var menuId = chrome.contextMenus.create({
        title: 'YSH切换模式', // %s表示选中的文字
        contexts: ['page'], // 
    });
    chrome.contextMenus.create({
        title: '切换到夜间模式', // %s表示选中的文字
        contexts: ['page'], // 
        parentId: menuId,
        onclick: function(onClickData, tab) {
            setCurentToggle(true);
            chrome.tabs.sendMessage(tab.id, curentCtrl);
            //chrome.contextMenus.update(menuId,{title: 'YSH白天模式'}, function(){});
        }
    });
    chrome.contextMenus.create({
        title: '切换到白天模式', // %s表示选中的文字
        contexts: ['page'], // 
        parentId: menuId,
        onclick: function(onClickData, tab) {
            setCurentToggle(false);
            chrome.tabs.sendMessage(tab.id, curentCtrl);
            //chrome.contextMenus.update(menuId,{title: 'YSH白天模式'}, function(){});
        }
    });

    


    chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
        if (curentCtrl.toggle) {
            chrome.tabs.sendMessage(tabid, curentCtrl);
            //chrome.tabs.sendMessage(tabid, Object.assign({token:1},curentCtrl));
        }
    });


    function setCurentToggle(toggle) {
        if (curentCtrl.toggle !== toggle) {
            curentCtrl.toggle = toggle

        }
    }

    function toggleSwitcher(toggle) {

        return curentCtrl.toggle = !curentCtrl.toggle;
    }

    function sendMessageToContentScript(message, callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                if (callback) callback(response);
            });
        });
    }

    function sendMessageToAllContentScript(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });
    }
    return {
    	curentCtrl:curentCtrl,
    	defultCtrl:defultCtrl,
    	setCurentToggle:setCurentToggle,
    	toggleSwitcher:toggleSwitcher,
    	sendMessageToContentScript:sendMessageToContentScript,
    	sendMessageToAllContentScript:sendMessageToAllContentScript
    }
 })();