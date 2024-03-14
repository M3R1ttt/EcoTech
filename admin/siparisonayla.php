<?php
// Veritabanı bağlantısı
$localhost = "localhost";
$dbname = "ecotechg_siparisler";
$username = "ecotechg";
$password = "DP79Y6ex1nC(x#";
try {
    $pdo = new PDO("mysql:host=$localhost;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Bağlantı hatası durumunda hata mesajını gösterme
    echo "Bağlantı hatası: " . $e->getMessage();
    exit; // İşlemi sonlandır
}

// POST ile gönderilen verilerin alınması
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sipariş ID ve Tamamlanma durumu alınıyor
    $siparis_id = $_POST['siparis_id'];
    $iscomplete = isset($_POST['iscomplate']) ? 1 : 0; // Checkbox işaretli ise 1, değilse 0

    // Veritabanında güncelleme yapılacak sorgu
    $query = "UPDATE siparis SET iscomplate = :iscomplete WHERE id = :siparis_id";

    try {
        // Sorguyu hazırla
        $statement = $pdo->prepare($query);
        
        // Parametreleri bağla
        $statement->bindParam(':iscomplate', $iscomplete, PDO::PARAM_INT);
        $statement->bindParam(':siparis_id', $siparis_id, PDO::PARAM_INT);
        
        // Sorguyu çalıştır
        $statement->execute();

        // Başarılı mesajı gönder
        echo "Sipariş durumu güncellendi.";

        // Ana sayfaya yönlendir
        header("Location: index.php");
        exit; // İşlemi sonlandır

    } catch(PDOException $e) {
        // Hata mesajını göster
        echo "Güncelleme hatası: " . $e->getMessage();
    }
}
?>
