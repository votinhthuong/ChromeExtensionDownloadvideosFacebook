chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {

  
  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
    else
    {
      var sourceCode = message.innerText;
      //alert(sourceCode);
      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      var stringNeed = "hd_src_no_ratelimit";

      if (sourceCode.indexOf(stringNeed) >=0) {    

        var getHDlink = sourceCode.match('hd_src_no_ratelimit:"(.*)",aspect_ratio');
        var HD_link =  getHDlink[1];

        var getSDlink = sourceCode.match('sd_src_no_ratelimit:"(.*)",hd_src_no_ratelimit');
        var SD_link =  getSDlink[1];


        var getTitle = sourceCode.match('id="pageTitle">(.*)</title>');
        //alert(getTitle);
        var titleName =  getTitle[1];

        var mydiv = document.getElementById("hdqual");
        var aTag = document.createElement('a');
        aTag.setAttribute('href',HD_link);
        aTag.setAttribute('download',"download");
        aTag.innerHTML = "<button class='button'><span>HD QUALITY</span</button>";
        mydiv.innerText="[HD]"+" "+titleName;
        mydiv.appendChild(aTag);

        var mydiv1 = document.getElementById("sdqual");
        var aTag1 = document.createElement('a');
        aTag1.setAttribute('href',SD_link);
        aTag1.setAttribute('download',"download");
        aTag1.innerHTML = "<button class='button'><span>SD QUALITY</span></button>";
        mydiv1.innerText="[SD]"+" "+titleName;
        mydiv1.appendChild(aTag1);

        //document.getElementById("hdqual").href = HD_link;
        //document.getElementById("sdqual").href = SD_link;
      var searchTitle ='id="pageTitle">';
       
      
      
      

      }
      else { //KHÔNG CÓ CHẤT LƯỢNG HD THÌ XỬ LÝ Ở ĐÂY. 

        var getSDlink = sourceCode.match('sd_src_no_ratelimit:"(.*)",aspect_ratio');
        var SD_link =  getSDlink[1];
        //document.getElementById("sdqual").href = SD_link;

        var getTitle = sourceCode.match('id="pageTitle">(.*)</title>');
        //alert(getTitle);
        var titleName =  getTitle[1];

        var mydiv1 = document.getElementById("sdqual");
        var aTag1 = document.createElement('a');
        aTag1.setAttribute('href',SD_link);
        aTag1.setAttribute('download',"download");
        aTag1.innerHTML = "<button class='button'><span>SD QUALITY</span></button>";
        mydiv1.innerText="[SD]"+" "+titleName;
        mydiv1.appendChild(aTag1);


        var tenSD="SD Video";
      }




      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      
    }

  });
  
}

window.onload = onWindowLoad;