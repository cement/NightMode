
    let nightStyleElement=null;
    
    function getCurrentStyle(ctrlObj) {
      return `*{background-color:${ctrlObj.backColor} !important; color:${ctrlObj.textColor} !important}    
              img{background-color:${ctrlObj.backColor} !unportant; opacity:${ctrlObj.imgOpacity} !important}
              a,a:link{color:${ctrlObj.linkColor} !important}
              a:visited{color:${ctrlObj.visited} !important}
              a:hover{background-color:${ctrlObj.hoverBack} !important;color:${ctrlObj.linkHover} !important}`;
    }
    
   function insertNightCss(ctrlObj){
      nightStyleElement = document.createElement('style');
      //nightStyleElement.setAttribute('id','dcq');
      nightStyleElement.innerHTML=getCurrentStyle(ctrlObj);
      document.head.appendChild(nightStyleElement);
   } 
   function removeNightCss(){
      if(nightStyleElement){
        //nightStyleElement.parentNode.removeChild(nightStyleElement);
        //document.head.removeChild(nightStyleElement);
        nightStyleElement.remove();
        nightStyleElement=null;
      }
    
   } 


  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
     console.dir(message);
     if(message.toggle){
          removeNightCss();
          insertNightCss(message);
     }else{
          removeNightCss();
     }
  });
  



  