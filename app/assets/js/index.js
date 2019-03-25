$(document).ready(function() {
  var products;

  $.ajax({
    type: 'GET',
    url: 'https://raw.githubusercontent.com/diogoqds/desafio-front-end-humanoide/master/server/data.json',
    success: function(data) {
      products = JSON.parse(data);
      fillProducts(products);
    }
  });
});

function fillProducts(data) {
  for (var index = 0; index < data.products.length; index++) {
    var product = data.products[index];
    var price = "";

    if (product.promotional_price) {
      price = "De <span class='card__price--dashed'>R$ " + product.promotional_price + "</span> por <span class='card__price--color-orange'><strong>&nbsp;R$ " + product.price + "</strong></span>"
    } else {
      price = "Por <span class='card__price--color-orange'><strong>&nbsp;R$ " + product.price + "</strong></span>"
    }

    $($('.products__container')[0]).append("<div class='card'><img src='../" + data.products[index].image + "' alt='fantasia' class='card__image'><div class='card__price'>" + price + "<br><a href='show.html?product_id=" + product.id +  "' class='button card__button'>Mais detalhes</a></div></div>")
  }
}