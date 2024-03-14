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
    
    // Siparişler tablosundaki tüm verileri seçme sorgusu
    $query = "SELECT * FROM siparis";
    
    // Sorguyu hazırla
    $statement = $pdo->prepare($query);
    
    // Sorguyu çalıştır
    $statement->execute();
    
    // Sonuçları al
    $siparisler = $statement->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
    // Bağlantı hatası durumunda hata mesajını gösterme
    echo "Bağlantı hatası: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siparişler</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Siparişler</h1>
    <table>
        <tr>
            <th>Sipariş ID</th>
            <th>Fiyat</th>
            <th>Ürün</th>
            <th>Müşteri Adı</th>
            <th>Müşteri Email</th>
            <th>Müşteri Telefon</th>
            <th>Tamamlandı</th> <!-- Yeni sütun başlığı -->
        </tr>   
        <?php foreach ($siparisler as $siparis): ?>
            <tr>
                <td><?php echo $siparis['id']; ?></td>
                <td><?php echo $siparis['price']; ?></td>
                <td><?php echo $siparis['ordertext']; ?></td>
                <td><?php echo $siparis['customername']; ?></td>
                <td><?php echo $siparis['customermail']; ?></a></td>
                <td><a href="https://wa.me/90<?php echo $siparis['customertelno'];?>">0<?php echo $siparis['customertelno'];?></a></td>
                <td>
                    <!-- Checkbox kontrolü -->
                    <form action="siparisonayla.php" method="post">
                        <input type="hidden" name="siparis_id" value="<?php echo $siparis['id']; ?>">
                        <input type="checkbox" name="iscomplete" <?php echo $siparis['iscomplate'] ? 'checked' : ''; ?>>
                        <input type="submit" value="Güncelle">
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>


