$(document).ready(function() {
  var products;

  $.ajax({
    type: 'GET',
    url: 'https://raw.githubusercontent.com/diogoqds/desafio-front-end-humanoide/master/server/data.json',
    success: function(data) {
      products = JSON.parse(data);
      $('.products__container').empty();
      fillProducts(products);

      if (location.search) {
        fillProduct(products, location.search.match(/[0-9]+/g));
      }
    }
  });
});

function fillProducts(data) {
  for (var index = 0; index < data.products.length; index++) {
    var product = data.products[index];
    var price = "";

    if (product.promotional_price) {
      if (product.price) {
        price = "De <span class='card__price--dashed'>R$ " + product.promotional_price + "</span> por <span class='card__price--color-orange'><strong>&nbsp;R$ " + product.price + "</strong></span>"
      } else {
        price = "Por <span class='card__price--color-orange'><strong>&nbsp;R$ " + product.promotional_price + "</strong></span>"
      }
    } else {
      price = "Por <span class='card__price--color-orange'><strong>&nbsp;R$ " + product.price + "</strong></span>"
    }

    $($('.products__container')[0]).append("<div class='card'><img src='../" + data.products[index].image + "' alt='fantasia' class='card__image'><div class='card__price'>" + price + "<br><a href='show.html?product_id=" + product.id +  "' class='button card__button'>Mais detalhes</a></div></div>")
  }
}

function fillProduct(data, product_id) {
  var product = data.products[product_id - 1];
  var price = "";

  if (product.promotional_price) {
    if (product.price) {
      price = "De <span class='product__price--dashed'>R$ " + product.promotional_price + "</span> por <strong>R$ " + product.price + "</strong></span>"
    } else {
      price = "Por <strong>R$ " + product.promotional_price + "</strong>"
    }
  } else {
    price = "Por <strong>R$ " + product.price + "</strong>"
  }

  $('.product__image').attr('src', '../' + product.image);
  $('.product__name').text(product.title);
  $('.product__description').text(product.description);
  $('.product__price').html(price);

  $('.product__inputs').empty();

  for (var index = 0; index < product.sizes.length; index++) {
    var size = product.sizes[index];

    $($('.product__inputs')[0]).append("<input type='radio' id='" + size + "' class='product__form_radio' name='size' value='" + size + "'><label for='" + size + "' class='product__form__label'>" + size + "</label>")
    $($('.product__inputs')[1]).append("<input type='radio' id='" + size + "-m' class='product__form_radio' name='size-m' value='" + size + "'><label for='" + size + "-m' class='product__form__label'>" + size + "</label>")
  }
}