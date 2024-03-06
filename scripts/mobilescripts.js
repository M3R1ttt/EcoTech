$(document).ready(function() {

const kartlar = document.querySelectorAll('.kart');

// Her bir kart için olay dinleyicilerini ekle
kartlar.forEach(function(kart) {
    const onYazi = kart.querySelector('.on-yazi');
    const arkaYazi = kart.querySelector('.arka-yazi');

    let acikMi = false; // Kartın açık mı kapalı mı olduğunu takip etmek için bir değişken

    // Kart üzerine tıklandığında
    kart.addEventListener('click', function() {
        // Kart açıksa kapat, kapalıysa aç
        if (acikMi) {
            onYazi.style.transform = 'rotateY(0deg)';
            arkaYazi.style.transform = 'rotateY(-180deg)';
        } else {
            onYazi.style.transform = 'rotateY(180deg)';
            arkaYazi.style.transform = 'rotateY(0deg)';
        }
        // Kartın açık/kapalı durumunu güncelle
        acikMi = !acikMi;
    });
});

    

});

function openNav() {
    document.getElementById("user").style.display = "block";
    document.getElementById("menu").style.width = "250px";
    document.getElementById("user").style.position = "fixed";
    document.getElementById("user").style.bottom = "0";
}

function closeNav() {
    document.getElementById("menu").style.width = "0";
    document.getElementById("user").style.display = "none";
    document.getElementById("user").style.bottom = "0";
}
