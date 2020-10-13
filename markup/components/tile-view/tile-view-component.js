$(document).ready(function () {

    // JSON DATA
    var itemsList = {
        "items": [
          {
            "name": "Samsung Series 4",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 13999,
              "display": 22500
            },
            "discount": 37
          },
          {
            "name": "Samsung Super 6",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 35999,
              "display": 66900
            },
            "discount": 46
          },
          {
            "name": "Samsung The Frame",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 84999,
              "display": 133900
            },
            "discount": 36
          },
          {
            "name": "Thomson B9 Pro",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 9999,
              "display": 16999
            },
            "discount": 41
          },
          {
            "name": "LG Ultra HD",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 39990,
              "display": 79990
            },
            "discount": 50
          },
          {
            "name": "Vu Ready LED TV",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 7999,
              "display": 17e3
            },
            "discount": 52
          },
          {
            "name": "Koryo Android TV",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinonedesktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 55999,
              "display": 199990
            },
            "discount": 71
          },
          {
            "name": "Micromax LED Smart",
            "image": "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-inteliris-original-imaeh5h83fuzbksz.jpeg?q=90",
            "price": {
              "actual": 9999,
              "display": 27990
            },
            "discount": 64
          }
        ]
      }
    
    // Getting Json data and showing in DOM
      var itemCountId = 0;
    $.each(itemsList.items, function(key, value) {
        $(".tile-view-container").append(`
            <div class="item-details-container" data-id = "itemId-` + itemCountId + `">
                <div class="item-image-section">
                    <div class="item-discount">` + value.discount + `% off</div>
                    <img src="` + value.image + `">
                </div>
                <div class="item-details-section">
                    <div class="item-name">` + value.name + `</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="` + value.price.display +`">$` + value.price.display + `</span>
                            <span class="item-actual-price" data-actual="` + value.price.actual + `">$` + value.price.actual + `</span>
                        </div>
                        <button class="add-to-cart-btn"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `)
        itemCountId++;
    })
    
    //Add to Cart Button functionalities
    var discValues = [];
    $(".add-to-cart-btn").on('click',function(){
        $(".header-toast-msg").empty();
        $(this).text("Added to cart");
        $(this).css('cursor','not-allowed');
        $(this).prop("disabled", true);
        var itemUniqueId = $(this).parents(".item-details-container").attr("data-id");
        var itemName = $(this).parents(".item-details-section").find(".item-name").text();
        var itemImg = $(this).parents(".item-details-container").find(".item-image-section img").attr("src");
        var itemDisplayPrice = $(this).parent().find(".item-display-price").text();
        var itemDisplayId = $(this).parent().find(".item-display-price").attr('data-display');
        var itemActualId = $(this).parent().find(".item-actual-price").attr('data-actual');
    
        $(".header-container").append(`<div class="header-toast-msg"> <span>` + itemName +` is added to cart </span></div>`);
        $(".added-items-list").append(`<div class="added-item" data-id ="` + itemUniqueId +` " data-display="` + itemDisplayId + `" data-actual="` + itemActualId + `">
                                            <div class="added-item-details">
                                                <div class="item-name-img">
                                                    <div>
                                                        <img src="` + itemImg + `">
                                                    </div>   
                                                    <span class="added-item-name">` + itemName + `</span> 
                                                    <div class="remove-item">x</div>
                                                </div>
                                            </div>
                                            <div class=item-add-sub> 
                                                <input type="button" value="-" class="sub" >
                                                <input type="text" size="10" value="1" class="totalCount" disabled>
                                                <input type="button" value="+" class="add" >
                                            </div>
                                            <div class="added-item-price">` + itemDisplayPrice + `</div>
                                        </div>`);
    
        // Time out 3secs for toast message when added to cart
        setTimeout(function(){
            $('.header-toast-msg').hide();
        }, 3000);
    
        // Item Count on cart
        var itemCount = $(".added-item").length;
        $(".total-items-added").text('Items' + '(' + itemCount + ')');
    
        //Total price calc without discount
        var itemPriceAdd = $(".added-item-price").text().split('$');
        var totalItemPrice = itemPriceAdd.reduce(function(a, b){
            return a*1 + b*1;
        });
        $(".total-price").text('$' + totalItemPrice);
        
        //Discount Price Calc
        var displayPrice = $(this).siblings(".item-price").find(".item-display-price").attr("data-display");
        var actualPrice = $(this).siblings(".item-price").find(".item-actual-price").attr("data-actual");
        var discountPrice = (displayPrice - actualPrice);
        
        discValues.push(discountPrice);
        var totalDiscPrice = discValues.reduce(function(a,b) {
        return a*1 + b*1;
        });
        $(".disc-price").text('-' + '$' + totalDiscPrice);
    
        // Order Total Price Calc
        $(".item-sub-total").text('$' + (totalItemPrice - totalDiscPrice));
    });
    
    // Remove items from Cart
    $(".added-items-list").on('click',".remove-item",function(){
        
        var cartItemId = $(this).closest(".added-item").attr("data-id");
        $("[data-id= " + cartItemId + " ]").find(".add-to-cart-btn").text("Add to cart");
        $("[data-id= " + cartItemId + " ]").find(".add-to-cart-btn").css("cursor","pointer");
        $("[data-id= " + cartItemId + " ]").find(".add-to-cart-btn").removeAttr("disabled");
    
        $(this).parents(".added-item").remove();
    
        var itemPriceRem = $(this).closest(".added-item").find(".added-item-price").text().split('$')[1];
        $(".total-price").text('$' + (parseInt($(".total-price").text().split('$')[1])-(itemPriceRem)));
    
        var itemCountRemove = $(".added-item").length;
        $(".total-items-added").text('Items' + '(' + itemCountRemove + ')');

        var displayRem = parseInt($(this).closest(".added-item").attr('data-display'));
        var actualRem = parseInt($(this).closest(".added-item").attr('data-actual'));
        var finalRemAmount = parseInt(actualRem - displayRem );
        var quantVal = parseInt($(this).parents(".added-item").find(".totalCount").val());

        var totalRemDisc = parseInt(quantVal*finalRemAmount);

        discValues.push(totalRemDisc)
        var remDisc = discValues.reduce(function(a,b) {
            return a*1 + b*1;
        });
        if(remDisc === 0) {
            $(".disc-price").text(remDisc);
        }else {
            $(".disc-price").text('-' + '$' + remDisc);
        }
            $(".item-sub-total").text('$' +  ((parseInt($(".item-sub-total").text().split('$')[1])) -  (((displayRem + finalRemAmount)*quantVal)) ));
    });
    
    // Increase same number of items in cart button
    $(".added-items-list").on('click',".add",function(){
    
        var  count = parseInt($(this).closest(".added-item").find(".totalCount").val());
        $(this).closest(".added-item").find(".totalCount").val(count + 1);
    
        var itemPriceAdd = $(this).closest(".added-item").find(".added-item-price").text().split('$')[1];
        var singleItemPriceAdd = itemPriceAdd/count;
        var newitemPrice = singleItemPriceAdd*(count + 1);
    
        $(this).closest(".added-item").find(".added-item-price").text('$'+ newitemPrice);
        $(".total-price").text('$' + (parseInt($(".total-price").text().split('$')[1])+(singleItemPriceAdd)));
    
        var displayAdd = $(this).closest(".added-item").attr('data-display');
        var actualAdd = $(this).closest(".added-item").attr('data-actual');
        var singleDiscAddAmount = (displayAdd - actualAdd);
        
        discValues.push(singleDiscAddAmount)
        var addDisc = discValues.reduce(function(a,b) {
            return a*1 + b*1;
        });
        $(".disc-price").text('-' + '$' + addDisc);        
    
        var orderItemAmount = $(".total-price").text().split('$')[1];
        var orderDiscAmount = $(".disc-price").text().split('$')[1];
         $(".item-sub-total").text('$' + (orderItemAmount - orderDiscAmount));
    });
    
    //Decrease same number of items in cart button
    $(".added-items-list").on('click',".sub",function(){
        var  count = parseInt($(this).closest(".added-item").find(".totalCount").val());
        if (count > 1) {
            $(this).closest(".added-item").find(".totalCount").val(count - 1);
    
            var itemPriceSub = $(this).closest(".added-item").find(".added-item-price").text().split('$')[1];
            var singleItemPriceSub = itemPriceSub/count;
            var newitemPriceSub = singleItemPriceSub*(count - 1);
    
            $(this).closest(".added-item").find(".added-item-price").text('$'+ newitemPriceSub);
            $(".total-price").text('$' + (parseInt($(".total-price").text().split('$')[1])-(singleItemPriceSub)));
    
            var displaySub = $(this).closest(".added-item").attr('data-display');
            var actualSub = $(this).closest(".added-item").attr('data-actual');
            var singleDiscSubAmount = (actualSub - displaySub);

            discValues.push(singleDiscSubAmount)
            var subDisc = discValues.reduce(function(a,b) {
                return a*1 + b*1;
            });
            $(".disc-price").text('-' + '$' + subDisc);

            var orderItemSubAmount = $(".total-price").text().split('$')[1];
            var orderDiscSubAmount = $(".disc-price").text().split('$')[1];
            $(".item-sub-total").text('$' + (orderItemSubAmount - orderDiscSubAmount));
        }  
    })
    
    
    //   $.ajax({
    //     type: "GET",
    //     dataType: "json",
    //     url: "../../../data/items.json",
    //     success: function (data) {
    //       console.log(data);
    //     },
    //   });
    
     // $.getJSON("/src/assets/items.json", function(res) {
      //     console.log(res.items.name)
      // })
    
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYXJrdXAvY29tcG9uZW50cy90aWxlLXZpZXcvdGlsZS12aWV3LWNvbXBvbmVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gSlNPTiBEQVRBXHJcbiAgICB2YXIgaXRlbXNMaXN0ID0ge1xyXG4gICAgICAgIFwiaXRlbXNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJTYW1zdW5nIFNlcmllcyA0XCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJodHRwczovL3J1a21pbmltMS5mbGl4Y2FydC5jb20vaW1hZ2UvNjcwLzYwMC9hbGxpbm9uZWRlc2t0b3AvZC9uL3EvYXBwbGUtaW1hYy0yMS01LWluY2gtNGstcmV0aW5hLWNvcmUtaTUtMy0xZ2h6LThnYi0xdGItaW50ZWxpcmlzLW9yaWdpbmFsLWltYWVoNWg4M2Z1emJrc3ouanBlZz9xPTkwXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsXCI6IDEzOTk5LFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVwiOiAyMjUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NvdW50XCI6IDM3XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJTYW1zdW5nIFN1cGVyIDZcIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vcnVrbWluaW0xLmZsaXhjYXJ0LmNvbS9pbWFnZS82NzAvNjAwL2FsbGlub25lZGVza3RvcC9kL24vcS9hcHBsZS1pbWFjLTIxLTUtaW5jaC00ay1yZXRpbmEtY29yZS1pNS0zLTFnaHotOGdiLTF0Yi1pbnRlbGlyaXMtb3JpZ2luYWwtaW1hZWg1aDgzZnV6Ymtzei5qcGVnP3E9OTBcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxcIjogMzU5OTksXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IDY2OTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY291bnRcIjogNDZcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlNhbXN1bmcgVGhlIEZyYW1lXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJodHRwczovL3J1a21pbmltMS5mbGl4Y2FydC5jb20vaW1hZ2UvNjcwLzYwMC9hbGxpbm9uZWRlc2t0b3AvZC9uL3EvYXBwbGUtaW1hYy0yMS01LWluY2gtNGstcmV0aW5hLWNvcmUtaTUtMy0xZ2h6LThnYi0xdGItaW50ZWxpcmlzLW9yaWdpbmFsLWltYWVoNWg4M2Z1emJrc3ouanBlZz9xPTkwXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsXCI6IDg0OTk5LFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVwiOiAxMzM5MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjb3VudFwiOiAzNlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiVGhvbXNvbiBCOSBQcm9cIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vcnVrbWluaW0xLmZsaXhjYXJ0LmNvbS9pbWFnZS82NzAvNjAwL2FsbGlub25lZGVza3RvcC9kL24vcS9hcHBsZS1pbWFjLTIxLTUtaW5jaC00ay1yZXRpbmEtY29yZS1pNS0zLTFnaHotOGdiLTF0Yi1pbnRlbGlyaXMtb3JpZ2luYWwtaW1hZWg1aDgzZnV6Ymtzei5qcGVnP3E9OTBcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxcIjogOTk5OSxcclxuICAgICAgICAgICAgICBcImRpc3BsYXlcIjogMTY5OTlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjb3VudFwiOiA0MVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiTEcgVWx0cmEgSERcIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vcnVrbWluaW0xLmZsaXhjYXJ0LmNvbS9pbWFnZS82NzAvNjAwL2FsbGlub25lZGVza3RvcC9kL24vcS9hcHBsZS1pbWFjLTIxLTUtaW5jaC00ay1yZXRpbmEtY29yZS1pNS0zLTFnaHotOGdiLTF0Yi1pbnRlbGlyaXMtb3JpZ2luYWwtaW1hZWg1aDgzZnV6Ymtzei5qcGVnP3E9OTBcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxcIjogMzk5OTAsXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IDc5OTkwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY291bnRcIjogNTBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlZ1IFJlYWR5IExFRCBUVlwiLFxyXG4gICAgICAgICAgICBcImltYWdlXCI6IFwiaHR0cHM6Ly9ydWttaW5pbTEuZmxpeGNhcnQuY29tL2ltYWdlLzY3MC82MDAvYWxsaW5vbmVkZXNrdG9wL2Qvbi9xL2FwcGxlLWltYWMtMjEtNS1pbmNoLTRrLXJldGluYS1jb3JlLWk1LTMtMWdoei04Z2ItMXRiLWludGVsaXJpcy1vcmlnaW5hbC1pbWFlaDVoODNmdXpia3N6LmpwZWc/cT05MFwiLFxyXG4gICAgICAgICAgICBcInByaWNlXCI6IHtcclxuICAgICAgICAgICAgICBcImFjdHVhbFwiOiA3OTk5LFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVwiOiAxN2UzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY291bnRcIjogNTJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIktvcnlvIEFuZHJvaWQgVFZcIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vcnVrbWluaW0xLmZsaXhjYXJ0LmNvbS9pbWFnZS82NzAvNjAwL2FsbGlub25lZGVza3RvcC9kL24vcS9hcHBsZS1pbWFjLTIxLTUtaW5jaC00ay1yZXRpbmEtY29yZS1pNS0zLTFnaHotOGdiLTF0Yi1pbnRlbGlyaXMtb3JpZ2luYWwtaW1hZWg1aDgzZnV6Ymtzei5qcGVnP3E9OTBcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxcIjogNTU5OTksXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IDE5OTk5MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NvdW50XCI6IDcxXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJNaWNyb21heCBMRUQgU21hcnRcIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vcnVrbWluaW0xLmZsaXhjYXJ0LmNvbS9pbWFnZS82NzAvNjAwL2FsbGlub25lLWRlc2t0b3AvZC9uL3EvYXBwbGUtaW1hYy0yMS01LWluY2gtNGstcmV0aW5hLWNvcmUtaTUtMy0xZ2h6LThnYi0xdGItaW50ZWxpcmlzLW9yaWdpbmFsLWltYWVoNWg4M2Z1emJrc3ouanBlZz9xPTkwXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsXCI6IDk5OTksXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IDI3OTkwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY291bnRcIjogNjRcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgLy8gR2V0dGluZyBKc29uIGRhdGEgYW5kIHNob3dpbmcgaW4gRE9NXHJcbiAgICAgIHZhciBpdGVtQ291bnRJZCA9IDA7XHJcbiAgICAkLmVhY2goaXRlbXNMaXN0Lml0ZW1zLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgJChcIi50aWxlLXZpZXctY29udGFpbmVyXCIpLmFwcGVuZChgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWRldGFpbHMtY29udGFpbmVyXCIgZGF0YS1pZCA9IFwiaXRlbUlkLWAgKyBpdGVtQ291bnRJZCArIGBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWltYWdlLXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1kaXNjb3VudFwiPmAgKyB2YWx1ZS5kaXNjb3VudCArIGAlIG9mZjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIHZhbHVlLmltYWdlICsgYFwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1kZXRhaWxzLXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+YCArIHZhbHVlLm5hbWUgKyBgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1wcmljZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWRpc3BsYXktcHJpY2VcIiBkYXRhLWRpc3BsYXk9XCJgICsgdmFsdWUucHJpY2UuZGlzcGxheSArYFwiPiRgICsgdmFsdWUucHJpY2UuZGlzcGxheSArIGA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tYWN0dWFsLXByaWNlXCIgZGF0YS1hY3R1YWw9XCJgICsgdmFsdWUucHJpY2UuYWN0dWFsICsgYFwiPiRgICsgdmFsdWUucHJpY2UuYWN0dWFsICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtdG8tY2FydC1idG5cIj4gQWRkIHRvIENhcnQgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYClcclxuICAgICAgICBpdGVtQ291bnRJZCsrO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgLy9BZGQgdG8gQ2FydCBCdXR0b24gZnVuY3Rpb25hbGl0aWVzXHJcbiAgICB2YXIgZGlzY1ZhbHVlcyA9IFtdO1xyXG4gICAgJChcIi5hZGQtdG8tY2FydC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuaGVhZGVyLXRvYXN0LW1zZ1wiKS5lbXB0eSgpO1xyXG4gICAgICAgICQodGhpcykudGV4dChcIkFkZGVkIHRvIGNhcnRcIik7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2N1cnNvcicsJ25vdC1hbGxvd2VkJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIGl0ZW1VbmlxdWVJZCA9ICQodGhpcykucGFyZW50cyhcIi5pdGVtLWRldGFpbHMtY29udGFpbmVyXCIpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgIHZhciBpdGVtTmFtZSA9ICQodGhpcykucGFyZW50cyhcIi5pdGVtLWRldGFpbHMtc2VjdGlvblwiKS5maW5kKFwiLml0ZW0tbmFtZVwiKS50ZXh0KCk7XHJcbiAgICAgICAgdmFyIGl0ZW1JbWcgPSAkKHRoaXMpLnBhcmVudHMoXCIuaXRlbS1kZXRhaWxzLWNvbnRhaW5lclwiKS5maW5kKFwiLml0ZW0taW1hZ2Utc2VjdGlvbiBpbWdcIikuYXR0cihcInNyY1wiKTtcclxuICAgICAgICB2YXIgaXRlbURpc3BsYXlQcmljZSA9ICQodGhpcykucGFyZW50KCkuZmluZChcIi5pdGVtLWRpc3BsYXktcHJpY2VcIikudGV4dCgpO1xyXG4gICAgICAgIHZhciBpdGVtRGlzcGxheUlkID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLml0ZW0tZGlzcGxheS1wcmljZVwiKS5hdHRyKCdkYXRhLWRpc3BsYXknKTtcclxuICAgICAgICB2YXIgaXRlbUFjdHVhbElkID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLml0ZW0tYWN0dWFsLXByaWNlXCIpLmF0dHIoJ2RhdGEtYWN0dWFsJyk7XHJcbiAgICBcclxuICAgICAgICAkKFwiLmhlYWRlci1jb250YWluZXJcIikuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRvYXN0LW1zZ1wiPiA8c3Bhbj5gICsgaXRlbU5hbWUgK2AgaXMgYWRkZWQgdG8gY2FydCA8L3NwYW4+PC9kaXY+YCk7XHJcbiAgICAgICAgJChcIi5hZGRlZC1pdGVtcy1saXN0XCIpLmFwcGVuZChgPGRpdiBjbGFzcz1cImFkZGVkLWl0ZW1cIiBkYXRhLWlkID1cImAgKyBpdGVtVW5pcXVlSWQgK2AgXCIgZGF0YS1kaXNwbGF5PVwiYCArIGl0ZW1EaXNwbGF5SWQgKyBgXCIgZGF0YS1hY3R1YWw9XCJgICsgaXRlbUFjdHVhbElkICsgYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGRlZC1pdGVtLWRldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZS1pbWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgaXRlbUltZyArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRlZC1pdGVtLW5hbWVcIj5gICsgaXRlbU5hbWUgKyBgPC9zcGFuPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZW1vdmUtaXRlbVwiPng8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1pdGVtLWFkZC1zdWI+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiLVwiIGNsYXNzPVwic3ViXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzaXplPVwiMTBcIiB2YWx1ZT1cIjFcIiBjbGFzcz1cInRvdGFsQ291bnRcIiBkaXNhYmxlZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIitcIiBjbGFzcz1cImFkZFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkZWQtaXRlbS1wcmljZVwiPmAgKyBpdGVtRGlzcGxheVByaWNlICsgYDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcbiAgICBcclxuICAgICAgICAvLyBUaW1lIG91dCAzc2VjcyBmb3IgdG9hc3QgbWVzc2FnZSB3aGVuIGFkZGVkIHRvIGNhcnRcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXItdG9hc3QtbXNnJykuaGlkZSgpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgXHJcbiAgICAgICAgLy8gSXRlbSBDb3VudCBvbiBjYXJ0XHJcbiAgICAgICAgdmFyIGl0ZW1Db3VudCA9ICQoXCIuYWRkZWQtaXRlbVwiKS5sZW5ndGg7XHJcbiAgICAgICAgJChcIi50b3RhbC1pdGVtcy1hZGRlZFwiKS50ZXh0KCdJdGVtcycgKyAnKCcgKyBpdGVtQ291bnQgKyAnKScpO1xyXG4gICAgXHJcbiAgICAgICAgLy9Ub3RhbCBwcmljZSBjYWxjIHdpdGhvdXQgZGlzY291bnRcclxuICAgICAgICB2YXIgaXRlbVByaWNlQWRkID0gJChcIi5hZGRlZC1pdGVtLXByaWNlXCIpLnRleHQoKS5zcGxpdCgnJCcpO1xyXG4gICAgICAgIHZhciB0b3RhbEl0ZW1QcmljZSA9IGl0ZW1QcmljZUFkZC5yZWR1Y2UoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhKjEgKyBiKjE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi50b3RhbC1wcmljZVwiKS50ZXh0KCckJyArIHRvdGFsSXRlbVByaWNlKTtcclxuICAgICAgICBcclxuICAgICAgICAvL0Rpc2NvdW50IFByaWNlIENhbGNcclxuICAgICAgICB2YXIgZGlzcGxheVByaWNlID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5pdGVtLXByaWNlXCIpLmZpbmQoXCIuaXRlbS1kaXNwbGF5LXByaWNlXCIpLmF0dHIoXCJkYXRhLWRpc3BsYXlcIik7XHJcbiAgICAgICAgdmFyIGFjdHVhbFByaWNlID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5pdGVtLXByaWNlXCIpLmZpbmQoXCIuaXRlbS1hY3R1YWwtcHJpY2VcIikuYXR0cihcImRhdGEtYWN0dWFsXCIpO1xyXG4gICAgICAgIHZhciBkaXNjb3VudFByaWNlID0gKGRpc3BsYXlQcmljZSAtIGFjdHVhbFByaWNlKTtcclxuICAgICAgICBcclxuICAgICAgICBkaXNjVmFsdWVzLnB1c2goZGlzY291bnRQcmljZSk7XHJcbiAgICAgICAgdmFyIHRvdGFsRGlzY1ByaWNlID0gZGlzY1ZhbHVlcy5yZWR1Y2UoZnVuY3Rpb24oYSxiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEqMSArIGIqMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmRpc2MtcHJpY2VcIikudGV4dCgnLScgKyAnJCcgKyB0b3RhbERpc2NQcmljZSk7XHJcbiAgICBcclxuICAgICAgICAvLyBPcmRlciBUb3RhbCBQcmljZSBDYWxjXHJcbiAgICAgICAgJChcIi5pdGVtLXN1Yi10b3RhbFwiKS50ZXh0KCckJyArICh0b3RhbEl0ZW1QcmljZSAtIHRvdGFsRGlzY1ByaWNlKSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gUmVtb3ZlIGl0ZW1zIGZyb20gQ2FydFxyXG4gICAgJChcIi5hZGRlZC1pdGVtcy1saXN0XCIpLm9uKCdjbGljaycsXCIucmVtb3ZlLWl0ZW1cIixmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjYXJ0SXRlbUlkID0gJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgJChcIltkYXRhLWlkPSBcIiArIGNhcnRJdGVtSWQgKyBcIiBdXCIpLmZpbmQoXCIuYWRkLXRvLWNhcnQtYnRuXCIpLnRleHQoXCJBZGQgdG8gY2FydFwiKTtcclxuICAgICAgICAkKFwiW2RhdGEtaWQ9IFwiICsgY2FydEl0ZW1JZCArIFwiIF1cIikuZmluZChcIi5hZGQtdG8tY2FydC1idG5cIikuY3NzKFwiY3Vyc29yXCIsXCJwb2ludGVyXCIpO1xyXG4gICAgICAgICQoXCJbZGF0YS1pZD0gXCIgKyBjYXJ0SXRlbUlkICsgXCIgXVwiKS5maW5kKFwiLmFkZC10by1jYXJ0LWJ0blwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICBcclxuICAgICAgICAkKHRoaXMpLnBhcmVudHMoXCIuYWRkZWQtaXRlbVwiKS5yZW1vdmUoKTtcclxuICAgIFxyXG4gICAgICAgIHZhciBpdGVtUHJpY2VSZW0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5maW5kKFwiLmFkZGVkLWl0ZW0tcHJpY2VcIikudGV4dCgpLnNwbGl0KCckJylbMV07XHJcbiAgICAgICAgJChcIi50b3RhbC1wcmljZVwiKS50ZXh0KCckJyArIChwYXJzZUludCgkKFwiLnRvdGFsLXByaWNlXCIpLnRleHQoKS5zcGxpdCgnJCcpWzFdKS0oaXRlbVByaWNlUmVtKSkpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGl0ZW1Db3VudFJlbW92ZSA9ICQoXCIuYWRkZWQtaXRlbVwiKS5sZW5ndGg7XHJcbiAgICAgICAgJChcIi50b3RhbC1pdGVtcy1hZGRlZFwiKS50ZXh0KCdJdGVtcycgKyAnKCcgKyBpdGVtQ291bnRSZW1vdmUgKyAnKScpO1xyXG5cclxuICAgICAgICB2YXIgZGlzcGxheVJlbSA9IHBhcnNlSW50KCQodGhpcykuY2xvc2VzdChcIi5hZGRlZC1pdGVtXCIpLmF0dHIoJ2RhdGEtZGlzcGxheScpKTtcclxuICAgICAgICB2YXIgYWN0dWFsUmVtID0gcGFyc2VJbnQoJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuYXR0cignZGF0YS1hY3R1YWwnKSk7XHJcbiAgICAgICAgdmFyIGZpbmFsUmVtQW1vdW50ID0gcGFyc2VJbnQoYWN0dWFsUmVtIC0gZGlzcGxheVJlbSApO1xyXG4gICAgICAgIHZhciBxdWFudFZhbCA9IHBhcnNlSW50KCQodGhpcykucGFyZW50cyhcIi5hZGRlZC1pdGVtXCIpLmZpbmQoXCIudG90YWxDb3VudFwiKS52YWwoKSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbFJlbURpc2MgPSBwYXJzZUludChxdWFudFZhbCpmaW5hbFJlbUFtb3VudCk7XHJcblxyXG4gICAgICAgIGRpc2NWYWx1ZXMucHVzaCh0b3RhbFJlbURpc2MpXHJcbiAgICAgICAgdmFyIHJlbURpc2MgPSBkaXNjVmFsdWVzLnJlZHVjZShmdW5jdGlvbihhLGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEqMSArIGIqMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihyZW1EaXNjID09PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIuZGlzYy1wcmljZVwiKS50ZXh0KHJlbURpc2MpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgJChcIi5kaXNjLXByaWNlXCIpLnRleHQoJy0nICsgJyQnICsgcmVtRGlzYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLml0ZW0tc3ViLXRvdGFsXCIpLnRleHQoJyQnICsgICgocGFyc2VJbnQoJChcIi5pdGVtLXN1Yi10b3RhbFwiKS50ZXh0KCkuc3BsaXQoJyQnKVsxXSkpIC0gICgoKGRpc3BsYXlSZW0gKyBmaW5hbFJlbUFtb3VudCkqcXVhbnRWYWwpKSApKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBJbmNyZWFzZSBzYW1lIG51bWJlciBvZiBpdGVtcyBpbiBjYXJ0IGJ1dHRvblxyXG4gICAgJChcIi5hZGRlZC1pdGVtcy1saXN0XCIpLm9uKCdjbGljaycsXCIuYWRkXCIsZnVuY3Rpb24oKXtcclxuICAgIFxyXG4gICAgICAgIHZhciAgY291bnQgPSBwYXJzZUludCgkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5maW5kKFwiLnRvdGFsQ291bnRcIikudmFsKCkpO1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5hZGRlZC1pdGVtXCIpLmZpbmQoXCIudG90YWxDb3VudFwiKS52YWwoY291bnQgKyAxKTtcclxuICAgIFxyXG4gICAgICAgIHZhciBpdGVtUHJpY2VBZGQgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5maW5kKFwiLmFkZGVkLWl0ZW0tcHJpY2VcIikudGV4dCgpLnNwbGl0KCckJylbMV07XHJcbiAgICAgICAgdmFyIHNpbmdsZUl0ZW1QcmljZUFkZCA9IGl0ZW1QcmljZUFkZC9jb3VudDtcclxuICAgICAgICB2YXIgbmV3aXRlbVByaWNlID0gc2luZ2xlSXRlbVByaWNlQWRkKihjb3VudCArIDEpO1xyXG4gICAgXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuZmluZChcIi5hZGRlZC1pdGVtLXByaWNlXCIpLnRleHQoJyQnKyBuZXdpdGVtUHJpY2UpO1xyXG4gICAgICAgICQoXCIudG90YWwtcHJpY2VcIikudGV4dCgnJCcgKyAocGFyc2VJbnQoJChcIi50b3RhbC1wcmljZVwiKS50ZXh0KCkuc3BsaXQoJyQnKVsxXSkrKHNpbmdsZUl0ZW1QcmljZUFkZCkpKTtcclxuICAgIFxyXG4gICAgICAgIHZhciBkaXNwbGF5QWRkID0gJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuYXR0cignZGF0YS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgdmFyIGFjdHVhbEFkZCA9ICQodGhpcykuY2xvc2VzdChcIi5hZGRlZC1pdGVtXCIpLmF0dHIoJ2RhdGEtYWN0dWFsJyk7XHJcbiAgICAgICAgdmFyIHNpbmdsZURpc2NBZGRBbW91bnQgPSAoZGlzcGxheUFkZCAtIGFjdHVhbEFkZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGlzY1ZhbHVlcy5wdXNoKHNpbmdsZURpc2NBZGRBbW91bnQpXHJcbiAgICAgICAgdmFyIGFkZERpc2MgPSBkaXNjVmFsdWVzLnJlZHVjZShmdW5jdGlvbihhLGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEqMSArIGIqMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmRpc2MtcHJpY2VcIikudGV4dCgnLScgKyAnJCcgKyBhZGREaXNjKTsgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgdmFyIG9yZGVySXRlbUFtb3VudCA9ICQoXCIudG90YWwtcHJpY2VcIikudGV4dCgpLnNwbGl0KCckJylbMV07XHJcbiAgICAgICAgdmFyIG9yZGVyRGlzY0Ftb3VudCA9ICQoXCIuZGlzYy1wcmljZVwiKS50ZXh0KCkuc3BsaXQoJyQnKVsxXTtcclxuICAgICAgICAgJChcIi5pdGVtLXN1Yi10b3RhbFwiKS50ZXh0KCckJyArIChvcmRlckl0ZW1BbW91bnQgLSBvcmRlckRpc2NBbW91bnQpKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL0RlY3JlYXNlIHNhbWUgbnVtYmVyIG9mIGl0ZW1zIGluIGNhcnQgYnV0dG9uXHJcbiAgICAkKFwiLmFkZGVkLWl0ZW1zLWxpc3RcIikub24oJ2NsaWNrJyxcIi5zdWJcIixmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAgY291bnQgPSBwYXJzZUludCgkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5maW5kKFwiLnRvdGFsQ291bnRcIikudmFsKCkpO1xyXG4gICAgICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuZmluZChcIi50b3RhbENvdW50XCIpLnZhbChjb3VudCAtIDEpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBpdGVtUHJpY2VTdWIgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5maW5kKFwiLmFkZGVkLWl0ZW0tcHJpY2VcIikudGV4dCgpLnNwbGl0KCckJylbMV07XHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVJdGVtUHJpY2VTdWIgPSBpdGVtUHJpY2VTdWIvY291bnQ7XHJcbiAgICAgICAgICAgIHZhciBuZXdpdGVtUHJpY2VTdWIgPSBzaW5nbGVJdGVtUHJpY2VTdWIqKGNvdW50IC0gMSk7XHJcbiAgICBcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmFkZGVkLWl0ZW1cIikuZmluZChcIi5hZGRlZC1pdGVtLXByaWNlXCIpLnRleHQoJyQnKyBuZXdpdGVtUHJpY2VTdWIpO1xyXG4gICAgICAgICAgICAkKFwiLnRvdGFsLXByaWNlXCIpLnRleHQoJyQnICsgKHBhcnNlSW50KCQoXCIudG90YWwtcHJpY2VcIikudGV4dCgpLnNwbGl0KCckJylbMV0pLShzaW5nbGVJdGVtUHJpY2VTdWIpKSk7XHJcbiAgICBcclxuICAgICAgICAgICAgdmFyIGRpc3BsYXlTdWIgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYWRkZWQtaXRlbVwiKS5hdHRyKCdkYXRhLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbFN1YiA9ICQodGhpcykuY2xvc2VzdChcIi5hZGRlZC1pdGVtXCIpLmF0dHIoJ2RhdGEtYWN0dWFsJyk7XHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVEaXNjU3ViQW1vdW50ID0gKGFjdHVhbFN1YiAtIGRpc3BsYXlTdWIpO1xyXG5cclxuICAgICAgICAgICAgZGlzY1ZhbHVlcy5wdXNoKHNpbmdsZURpc2NTdWJBbW91bnQpXHJcbiAgICAgICAgICAgIHZhciBzdWJEaXNjID0gZGlzY1ZhbHVlcy5yZWR1Y2UoZnVuY3Rpb24oYSxiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYSoxICsgYioxO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIi5kaXNjLXByaWNlXCIpLnRleHQoJy0nICsgJyQnICsgc3ViRGlzYyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3JkZXJJdGVtU3ViQW1vdW50ID0gJChcIi50b3RhbC1wcmljZVwiKS50ZXh0KCkuc3BsaXQoJyQnKVsxXTtcclxuICAgICAgICAgICAgdmFyIG9yZGVyRGlzY1N1YkFtb3VudCA9ICQoXCIuZGlzYy1wcmljZVwiKS50ZXh0KCkuc3BsaXQoJyQnKVsxXTtcclxuICAgICAgICAgICAgJChcIi5pdGVtLXN1Yi10b3RhbFwiKS50ZXh0KCckJyArIChvcmRlckl0ZW1TdWJBbW91bnQgLSBvcmRlckRpc2NTdWJBbW91bnQpKTtcclxuICAgICAgICB9ICBcclxuICAgIH0pXHJcbiAgICBcclxuICAgIFxyXG4gICAgLy8gICAkLmFqYXgoe1xyXG4gICAgLy8gICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAvLyAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgLy8gICAgIHVybDogXCIuLi8uLi8uLi9kYXRhL2l0ZW1zLmpzb25cIixcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgfSk7XHJcbiAgICBcclxuICAgICAvLyAkLmdldEpTT04oXCIvc3JjL2Fzc2V0cy9pdGVtcy5qc29uXCIsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzLml0ZW1zLm5hbWUpXHJcbiAgICAgIC8vIH0pXHJcbiAgICBcclxuICAgIH0pOyJdLCJmaWxlIjoibWFya3VwL2NvbXBvbmVudHMvdGlsZS12aWV3L3RpbGUtdmlldy1jb21wb25lbnQuanMifQ==
