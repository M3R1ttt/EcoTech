$(document).ready(function() {
    fetch("/scripts/language.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        // JSON verisini arrLang değişkenine ata
        arrLang = json;

        $('.dropdown-item').click(function() {
            localStorage.setItem('dil', JSON.stringify($(this).attr('id'))); 
            location.reload();
          });
        
            var lang =JSON.parse(localStorage.getItem('dil'));
        
            if(lang=="en"){
                $("#drop_yazı").html("English");
                $("#en").css("display" , "none");
            }
            else if (lang=="ita"){
                $("#drop_yazı").html("Italiano");
                $("#ita").css("display" , "none");
            }
            else{
                $("#drop_yazı").html("Türkçe");
                $("#tr").css("display" , "none");
            }
        
            $('a,h5,p,h1,h2,span,li,button,h3,label').each(function(index,element) {
              $(this).text(arrLang[lang][$(this).attr('key')]);
            
          });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

})
