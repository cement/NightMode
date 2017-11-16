(function() {
    let background = chrome.extension.getBackgroundPage().back;

    let toggle = document.getElementById('toggle');
    let backColor = document.getElementById('backcolor');
    let textColor = document.getElementById('textcolor');
    let linkColor = document.getElementById('linkcolor');
    let linkHover = document.getElementById('linkhover');
    let visited = document.getElementById('visited');
    let percent = document.getElementById('percent');
    let imgOpacity = document.getElementById('imgOpacity');
    let reDefault = document.getElementById('reDefault');

    backColor.onchange = chengeCtrlParams;
    textColor.onchange = chengeCtrlParams;
    linkColor.onchange = chengeCtrlParams;
    linkHover.onchange = chengeCtrlParams;
    visited.onchange = chengeCtrlParams;
    imgOpacity.onchange = chengeCtrlParams;

    function displayChangeValue(changeValue) {
        // body...
        backColor.value = changeValue.backColor;
        textColor.value = changeValue.textColor;
        linkColor.value = changeValue.linkColor;
        linkHover.value = changeValue.linkHover;
        visited.value = changeValue.visited;
        imgOpacity.value = changeValue.imgOpacity * 100;
        percent.innerText = imgOpacity.value + '%';
    }

    function changeSwitcher(switcher) {
        if (switcher) {
            //background.curentToken(1);
            toggle.value = '恢复白天模式';
            document.body.style.backgroundColor = background.curentCtrl.backColor;
            document.body.style.color = background.curentCtrl.textColor;

            let items = document.getElementsByClassName('hidden');
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "inline";
            }
        } else {
            //background.curentToken(0);
            toggle.value = '打开夜间模式';
            document.body.style.backgroundColor = "";
            document.body.style.color = "";

            let items = document.getElementsByClassName('hidden');
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "none";
            }
        }

    }

    function chengeCtrlParams() {
        if (background.curentCtrl.toggle) {
            background.curentCtrl.backColor = backColor.value;
            background.curentCtrl.textColor = textColor.value;
            background.curentCtrl.linkColor = linkColor.value;
            background.curentCtrl.linkHover = linkHover.value;
            background.curentCtrl.visited = visited.value;
            background.curentCtrl.imgOpacity = imgOpacity.value / 100;
            percent.innerText = imgOpacity.value + '%';

            document.body.style.backgroundColor = background.curentCtrl.backColor;
            document.body.style.color = background.curentCtrl.textColor;
            background.sendMessageToContentScript(background.curentCtrl);
        }
    }
    //console.dir(chrome.storage);
    toggle.onclick = function() {
        //console.log(background.switcher);
        let toggle = background.toggleSwitcher();
        //background.switcher=!background.switcher;
        //console.dir(background.curentCtrl.token);
        //background.curentCtrl.toggle=!background.curentCtrl.toggle;
        //background.curentCtrl.toggle=!background.curentCtrl.toggle;
        changeSwitcher(toggle);
        background.sendMessageToContentScript(background.curentCtrl);
        //console.dir(background.curentCtrl);
        //chrome.storage.local.set(background.curentCtrl);
        //chengeParams();
    };
    reDefault.onclick = function() {
        background.curentCtrl = Object.assign(background.curentCtrl, background.defultCtrl);
        //background.curentToken(1);
        displayChangeValue(background.curentCtrl);
        document.body.style.backgroundColor = background.curentCtrl.backColor;
        document.body.style.color = background.curentCtrl.textColor;
        background.sendMessageToContentScript(background.curentCtrl);
    };


    //background.sendMessageToContentScript(background.curentCtrl);
    displayChangeValue(background.curentCtrl);
    changeSwitcher(background.curentCtrl.toggle);

})();