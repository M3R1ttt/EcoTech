<?php
$localhost = "localhost";
$dbname = "ecotechg_siparisler";
$username = "ecotechg";
$password = "DP79Y6ex1nC(x#";

try {
    // PDO nesnesi oluşturma
    $pdo = new PDO("mysql:host=$localhost;dbname=$dbname", $username, $password);
    
    // Hata raporlamasını etkinleştirme
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Veritabanına başarıyla bağlandı.";

    // Kullanıcı bilgilerini al
    $isim = $_POST['isim'];
    $soyisim = $_POST['soyisim'];
    $email = $_POST['email'];
    $telefon = $_POST['telefon'];

    // Verileri tabloya ekle
    $price = $_POST['price'];
    $ordertext = $_POST['ordertext'];
    
    // SQL sorgusu oluşturma
    $insertSql = "INSERT INTO siparis(price, ordertext, customername, customermail, customertelno) 
                  VALUES ('$price', '$ordertext', '$isim $soyisim', '$email', '$telefon')";
    
    // Sorguyu çalıştırma
    $pdo->exec($insertSql);
    echo "Ürün başarıyla sepete eklendi.";

    $to_email = "$email";
    $subject = "Siparişiniz Alındı!";
    $body = "Siparişleriniz olan $ordertext alınmıştır en kısa zamanda dönüş yapacağız.";

    // Gönderici e-posta adresi
    $from_email = "ecotechgencbizz@gmail.com";

    // E-posta başlığı ve gönderici bilgileri
    $headers = "From: $from_email";

    // E-posta gönderme işlemi
    if (mail($to_email, $subject, $body, $headers)) {
        echo "E-posta başarıyla gönderildi.";
    } else {
        echo "E-posta gönderilirken bir hata oluştu.";
    }

    // Yapılan işlemi kontrol etmek için
    header("Location: /sepet/index.html");

    // Veritabanı bağlantısını kapatma
    $pdo = null;

} catch(PDOException $e) {
    // Bağlantı hatası durumunda hata mesajını gösterme
    echo "Bağlantı hatası: " . $e->getMessage();
}
?>
