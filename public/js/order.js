



$(document).ready(function(){



var totalPrice = 0;

$(".input").change(function(){
  var qnt = $(this).val();
  var index = $(this).attr('data-index');
  var price = parseInt($('#productPrice0').text());

  var prevVal = $(this).attr('data-prev');
  totalPrice = totalPrice - (prevVal * price);

  var search = "#productPrice" + index;



  var unitTotal = price * qnt;

  $(this).attr("data-prev", qnt);
  totalPrice = totalPrice + unitTotal;

});

  $('.btn-success').on("click", function(){
//displaying
    console.log(totalPrice);
// var html = $(`${totalPrice}`);
//     html.appendTo($("#subtotal"));
    $('#subtotal').empty();
    $("#subtotal").append(`<p>$${totalPrice}</p>`);
  });
});
