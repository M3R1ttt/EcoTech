$(document).ready(function() {
    $(".c1").hide();
    $(".c2").hide();
    $(".c3").hide();
    $(".c4").hide();
    $(".c5").hide();
    $(".s1").click(function(){
        $(".c1").slideToggle();
    })
    $(".s2").click(function(){
        $(".c2").slideToggle();
    })
    $(".s3").click(function(){
        $(".c3").slideToggle();
    })
    $(".s4").click(function(){
        $(".c4").slideToggle();
    })
    $(".s5").click(function(){
        $(".c5").slideToggle();
    })

    // Tüm kartları seç
const kartlar = document.querySelectorAll('.kart');

// Her bir kart için olay dinleyicilerini ekle
kartlar.forEach(function(kart) {
    const onYazi = kart.querySelector('.on-yazi');
    const arkaYazi = kart.querySelector('.arka-yazi');

    kart.addEventListener('mouseover', function() {
        onYazi.style.transform = 'rotateY(-180deg)';
        arkaYazi.style.transform = 'rotateY(0deg)';
    });

    kart.addEventListener('mouseleave', function() {
        onYazi.style.transform = 'rotateY(0deg)';
        arkaYazi.style.transform = 'rotateY(180deg)';
    });
});

});

