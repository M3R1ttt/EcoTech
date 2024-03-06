angular.module('myApp', [])
.controller('ProductController', ['$scope', function($scope) {
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
          name: 'Deniz kabuğu mum',
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

    $scope.redirectToProduct = function(product) {
      // Ürün bilgilerini alarak yönlendirme işlemi
      $location.path('/product/' + product.name); // Örneğin ürün adını URL'de kullanarak yönlendirme yapıyorum
  };
}]);




var shoppingCart = (function () {

    cart = [];

    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }

    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();


  // Add item
  $('.default-btn').click(function (event) {
    // alert('working');
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });


  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }

  // Delete item button

  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

  // Item count input
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  displayCart();

//////// ui script start /////////
// Tabs Single Page
$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
$('.tab ul.tabs li a').on('click', function (g) {
    var tab = $(this).closest('.tab'), 
    index = $(this).closest('li').index();
    tab.find('ul.tabs > li').removeClass('current');
    $(this).closest('li').addClass('current');
    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
    g.preventDefault();
});

// search function
$('#search_field').on('keyup', function() {
  var value = $(this).val();
  var patt = new RegExp(value, "i");

  $('.tab_content').find('.col-lg-3').each(function() {
    var $table = $(this);
    
    if (!($table.find('.featured-item').text().search(patt) >= 0)) {
      $table.not('.featured-item').hide();
    }
    if (($table.find('.col-lg-3').text().search(patt) >= 0)) {
      $(this).show();
      document.getElementById('not_found').style.display = 'none';
    } else {
      document.getElementById("not_found").innerHTML = " Product not found..";
      document.getElementById('not_found').style.display = 'block';
    }
    
  });
  
});