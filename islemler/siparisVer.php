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
    
    // Formdan alınan telefon numarasını temizleme
    $telefon = $_POST['telefon'];

    // Boşlukları ve başındaki sıfırları kaldırma
    $telefon = preg_replace('/\s+/', '', $telefon); // Boşlukları kaldır
    $telefon = ltrim($telefon, '0'); // Başındaki sıfırları kaldır

    // Telefon numarasını kontrol etme
    if (strlen($telefon) > 11) {
        echo "Lütfen geçerli bir telefon numarası girin.";
    } else {
        // Verileri tabloya ekle
        $price = $_POST['price'];
        $ordertext = $_POST['ordertext'];
        
        // SQL sorgusu oluşturma
        $insertSql = "INSERT INTO siparis(price, ordertext, customername, customermail, customertelno, iscomplate) 
                    VALUES ('$price', '$ordertext', '$isim $soyisim', '$email', '$telefon', '0')";
        
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
    }
} catch(PDOException $e) {
    // Bağlantı hatası durumunda hata mesajını gösterme
    echo "Bağlantı hatası: " . $e->getMessage();
}
?>
