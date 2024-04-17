angular.module('myApp', []).controller('ProductController', ['$scope', '$http', function($scope, $http) {
  // Ürünler listesi
  $scope.products = [
      {
          name: 'Kokulu Kahve Mumlar',
          price: '80₺',
          rating: '4.9',
          imageUrl: 'https://i.pinimg.com/564x/77/63/33/7763338077acb7f5809d198279a94434.jpg'
      },
      {
          name: 'Deniz kabuğu mum',
          price: '80₺',
          rating: '4.4',
          imageUrl: 'https://i.pinimg.com/564x/4a/0c/2e/4a0c2ea9b8c1209ed567820a7bc80440.jpg'
      },
      {
          name: 'Deniz kabuğu mum',
          price: '80₺',
          rating: '4.4',
          imageUrl: 'https://i.pinimg.com/564x/ae/6d/98/ae6d983faa8cf9bf67b5699baf14e411.jpg'
      },
      {
        name: 'Deniz kasdamum',
        price: '80₺',
        rating: '4.4',
        imageUrl: 'https://i.pinimg.com/564x/38/a8/14/38a814b61d17bda6140c5d021b8579e5.jpg'
    },
    {
        name: 'Kokulu Kahve Mumlar',
        price: '80₺',
        rating: '4.9',
        imageUrl: 'https://i.pinimg.com/564x/77/63/33/7763338077acb7f5809d198279a94434.jpg'
    },
    {
        name: 'Deniz kabuğu mum',
        price: '80₺',
        rating: '4.4',
        imageUrl: 'https://i.pinimg.com/564x/8c/27/2a/8c272af730e440e11a9e1061273f8a53.jpg'
    },
    {
        name: 'Deniz kabuğu mum',
        price: '80₺',
        rating: '4.4',
        imageUrl: 'https://i.pinimg.com/564x/4a/0c/2e/4a0c2ea9b8c1209ed567820a7bc80440.jpg'
    },
    {
      name: 'Deniz kabuğu mum',
      price: '80₺',
      rating: '4.4',
      imageUrl: 'https://i.pinimg.com/564x/4a/0c/2e/4a0c2ea9b8c1209ed567820a7bc80440.jpg'
  }
        // Diğer ürünler buraya eklenebilir
  ];

  $scope.cart = [];
  $scope.totalPrice = 0;
  $scope.orderText = '';

  // Sepeti yerel depolamadan yükle
  var storedCart = localStorage.getItem('cart');
  if (storedCart) {
      $scope.cart = JSON.parse(storedCart);
  }

  // Ürünü sepete ekleme fonksiyonu
  $scope.addToCart = function(product) {
      var existingItem = $scope.cart.find(item => item.name === product.name); // Ürün zaten sepette mi kontrol et
      if (existingItem) {
          existingItem.quantity++; // Ürün sepette ise miktarını artır
      } else {
          var newItem = angular.copy(product); // Yeni bir kopya oluştur
          newItem.quantity = 1; // Miktarı 1 olarak ayarla
          $scope.cart.push(newItem); // Sepete ekle
      }
      localStorage.setItem('cart', JSON.stringify($scope.cart)); // Sepeti yerel depolamaya kaydet
      console.log('Sepete eklenen ürünler:', $scope.cart); // Sepete eklenen ürünleri konsola yazdır
      
      // Toplam fiyatı ve sipariş metnini güncelle
      $scope.updateTotalPrice();
      $scope.updateOrderText();
  };

  // Sepetin toplam fiyatını güncelleyen fonksiyon
  $scope.updateTotalPrice = function() {
      $scope.totalPrice = 0;
      for (var i = 0; i < $scope.cart.length; i++) {
          $scope.totalPrice += parseFloat($scope.cart[i].price) * $scope.cart[i].quantity;
      }
  };

  // Sipariş metnini oluşturan fonksiyon
  $scope.updateOrderText = function() {
      $scope.orderText = '';
      for (var i = 0; i < $scope.cart.length; i++) {
          $scope.orderText += $scope.cart[i].name + ': ' + $scope.cart[i].quantity + ' adet\n';
      }
  };

  // Sepetin toplam fiyatını ve sipariş metnini başlangıçta güncelle
  $scope.updateTotalPrice();
  $scope.updateOrderText();

  // Sepeti veritabanına kaydetme fonksiyonu
  $scope.saveCartToDatabase = function() {
      $http({
          method: 'POST',
          url: '/islemler/siparisVer.php',
          data: { price: $scope.totalPrice, ordertext: $scope.orderText },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function(response) {
          console.log(response.data);
          // Başarılı bir şekilde veritabanına eklendiğinde yapılacak işlemler buraya yazılabilir
      }, function(error) {
          console.log('Veritabanına kayıt sırasında bir hata oluştu:', error);
      });
  };


    // Sepetten belirli bir ürünü kaldırma fonksiyonu
    $scope.adetDusur = function(item) {
        var index = $scope.cart.indexOf(item);
        if (index !== -1) {
            if ($scope.cart[index].quantity > 1) {
                $scope.cart[index].quantity--; // Ürünün miktarını 1 azalt
            } else {
                $scope.cart.splice(index, 1); // Ürünü sepette tamamen kaldır
            }
            localStorage.setItem('cart', JSON.stringify($scope.cart)); // Sepeti güncelle
            console.log('Sepetten kaldırılan ürün:', item);
            
            // Toplam fiyatı ve sipariş metnini güncelle
            $scope.updateTotalPrice();
            $scope.updateOrderText();
        }
    };

    // Sepetten ürün kaldırma fonksiyonu
    $scope.removeFromCart = function(item) {
        var index = $scope.cart.indexOf(item);
        if (index !== -1) {
            $scope.cart.splice(index, 1); // Sepetten ürünü kaldır
            localStorage.setItem('cart', JSON.stringify($scope.cart)); // Sepeti güncelle
            console.log('Sepetten kaldırılan ürün:', item);
            
            // Toplam fiyatı ve sipariş metnini güncelle
            $scope.updateTotalPrice();
            $scope.updateOrderText();
        }
    };


}]);
