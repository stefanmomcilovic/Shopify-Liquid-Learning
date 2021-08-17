// Creating a function that will load a popUp
function loadPopUp() {
    $.ajax({
        type: "GET",
        url: "/cart?view=popup-drawer",
        success: function(response){
            $("#cart_drawer_action").prop("checked", true);
            $(".Cart_Drawer").html(response);

            // Add class myItem to regural item
            if($("div").hasClass("recommended-item")){
                $(".regular-item:last").addClass("myItem");
            }else{
                $(".regular-item:last").removeClass("myItem");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("<ERROR>");
                console.log(jqXHR, textStatus, errorThrown);
            console.log("</ERROR>");
        }
    });
}   

$(document).ready(function(){
    // If we clicked in navigation menu bag it will draw cartPopUp
    $("#drawCartPopUp").click(function(e){
        e.preventDefault();
        loadPopUp();
    });

    // We are in product template and when we click on add to cart, we add item in cart and draw cartPopUp
    $(".addItemToCart").click(function(e){
        e.preventDefault();

        var product_id = $(this).attr("data-add-to-cart");

        jQuery.post('/cart/update.js', "updates["+product_id+"]=1", function(response){
            var res = JSON.parse(response);

            if(res.token != null && res.token != undefined){
                loadPopUp();
            }
        }).fail(function(response) {
             Swal.fire({
                title: 'Error!',
                text: 'Something was happend please try again later!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    });

    // Adding recommended item to cart
    $("#add-recommended-item").click(function(e){
        e.preventDefault();
        var product_id = $(this).attr('data-recommended-item-id');

        jQuery.post('/cart/update.js', "updates["+product_id+"]=1", function(response){
            var res = JSON.parse(response);

            if(res.token != null && res.token != undefined){
                loadPopUp();
            }
        }).fail(function(response) {
             Swal.fire({
                title: 'Error!',
                text: 'Something was happend please try again later!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    });

    // Changing Quantity in Cart //

        $(".Qty_Minus").click(function (e) {
        e.preventDefault();
        var product_id = $(this).attr('data-variant-id');
        var quantity = $(this).siblings(".Qty_value").val();
        var myItem = $(this).siblings(".myItem");

        // If we have in cart recommended item we cannot remove regular item
        if(myItem.length == 1 && quantity <= 1){
            jQuery.post('/cart/update.js', "updates["+product_id+"]="+ (1) +"", function(response){
                var res = JSON.parse(response);

                if(res.token != null && res.token != undefined){
                    loadPopUp();
                }
            }).fail(function(response) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something was happend please try again later!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }else{
            jQuery.post('/cart/update.js', "updates["+product_id+"]="+ (quantity - 1) +"", function(response){
                var res = JSON.parse(response);

                if(res.token != null && res.token != undefined){
                    loadPopUp();
                }
            }).fail(function(response) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something was happend please try again later!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
        });

        $(".Qty_value").on("input", function () {
        var product_id = $(this).siblings(".btn").attr('data-variant-id');
        var quantity = $(this).val();
        var myItem = $(this).siblings(".myItem");
        
        // If we have in cart recommended item we cannot remove regular item
        if(myItem.length == 1 && quantity <= 1){
            jQuery.post('/cart/update.js', "updates["+product_id+"]="+ (1) +"", function(response){
                var res = JSON.parse(response);

                if(res.token != null && res.token != undefined){
                    loadPopUp();
                }
            }).fail(function(response) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something was happend please try again later!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }else{
            jQuery.post('/cart/update.js', "updates["+product_id+"]="+ quantity +"", function(response){
                var res = JSON.parse(response);

                if(res.token != null && res.token != undefined){
                    loadPopUp();
                }
            }).fail(function(response) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something was happend please try again later!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
        });

        $(".Qty_Plus").click(function (e) {
        e.preventDefault();
        var product_id = $(this).attr('data-variant-id');
        var quantity = $(this).siblings(".Qty_value").val();

        jQuery.post('/cart/update.js', "updates["+product_id+"]="+ (quantity * 1 + 1) +"", function(response){
            var res = JSON.parse(response);

            if(res.token != null && res.token != undefined){
                loadPopUp();
            }
        }).fail(function(response) {
             Swal.fire({
                title: 'Error!',
                text: 'Something was happend please try again later!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
        });

    // End of Changing Quantity in Cart //
});