$(function() {
  $('body').height(180); 
$('html').height(180); 
    chrome.storage.sync.get('translatePrefs', function(getEvent) {
      
      if(getEvent.translatePrefs && getEvent.translatePrefs.length) {
      //  chrome.extension.getBackgroundPage().console.log(getEvent.translatePrefs);
        let firstPref = getEvent.translatePrefs[0];
        let secondPref = getEvent.translatePrefs[1];
        $('#firstPref').on('change',function(){
          chrome.storage.sync.set({'translatePrefs': [this.value,secondPref]});
        })

        $('#secondPref').on('change',function(){
          chrome.storage.sync.set({'translatePrefs': [firstPref,this.value]});
        })

        selectElement('firstPref',firstPref);
        selectElement('secondPref',secondPref)

      } else {
       
        let firstPref = "EN";
        let secondPref = "HI";
        
        selectElement('firstPref',firstPref);
        selectElement('secondPref',secondPref)
      }
  });

  function saveText(filename, text) {
    var tempElem = document.createElement('a');
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    tempElem.setAttribute('download', filename);
    tempElem.click();
 }


 function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

});
