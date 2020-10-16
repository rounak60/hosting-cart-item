// function which fetches JSON data
function fetchItemData() {
  fetch("../../../data/items.json")
    .then((res) => {
      if (!res.ok) {
        throw Error("ERROR IN API");
      }
      return res.json();
    })
    .then((itemData) => {
      renderData(itemData.items);
    })
    .catch((error) => {
      console.log(error);
    });
}

// passing data into renderData() and rendering it into DOM
function renderData(renderItemData) {
  let itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" id="${index}" data-id = "itemId-${index}">
                <div class="item-image-section">
                    <div class="item-discount"> ${data.discount}% off</div>
                    <img class="item-image" src="${data.image}">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn" id="btn-${index}" onClick="addToCart(this)"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
    
  // Passing/appending list data for rendering
  document.querySelector(".items-tile-section").innerHTML = itemList;
}

function addToCart(itemData) {
  const id = itemData.getAttribute('id').split('-')[1];
  const selectedItem = itemData.parentElement.parentElement;
  const itemName = selectedItem.getElementsByClassName('item-name')[0].innerText;
  const imageUrl = selectedItem.parentElement.getElementsByClassName('item-image')[0].getAttribute('src');
  const itemDisplayPrice = parseInt(selectedItem.getElementsByClassName('item-display-price')[0].getAttribute('data-display'));
  const itemActualPrice = parseInt(selectedItem.getElementsByClassName('item-actual-price')[0].getAttribute('data-actual'));
  const itemTotal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const grossTotal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const newDiscount = itemDisplayPrice - itemActualPrice;

  //Updating Total, Discounted Price, Gross Total
  document.getElementsByClassName("item-total")[0].innerText =  (itemTotal + itemDisplayPrice);
  document.getElementsByClassName("disc-total")[0].innerText =  (discTotal + newDiscount);
  document.getElementsByClassName("gross-total")[0].innerText =  (grossTotal + itemActualPrice);

  // Function for Cart Button properties change on click.
  cartBtnProp(id, itemName); 

  // Creating HTML for Item Added to Cart
  const htmlTable =  `<tr class="cart-item-block" id="${id}" data-display="${itemDisplayPrice}" data-actual="${itemActualPrice}" data-index="${id}"> 
  <td> 
    <div class="item-list-details">
      <div class="item--details">
        <div>
          <img class="item-list-image" src="${imageUrl}">
        </div>
        <div class="item-list-name">${itemName}</div>
      </div>
      <div class="item-list-remove" onClick="removeItem(this)">x</div>
    </div> 
  </td> 
  <td class="list-item-qty">
    <input type="button" value="-" class="sub-quant" onClick="changeQuantity(this,'remove')" disabled>
    <input type="text" size="10" value="1" class="totalCount" disabled>
    <input type="button" value="+" class="add-quant" onClick="changeQuantity(this,'add')">
  </td> 
  <td class="list-item-price">${itemDisplayPrice}</td> 
</tr>`;

//Updating DOM with new HTML for Cart
document.querySelector(".added-items-list").innerHTML += htmlTable;
}

function cartItemLength() {
  const cartItemCount = document.getElementsByClassName("cart-item-block").length;
  document.getElementsByClassName("total-item-number").innerHTML = "Items" + "(" + cartItemCount + ")"
}

function cartBtnProp(index, name) {
  document.querySelector(`#btn-${index}`).setAttribute('disabled',true);
  document.querySelector(`#btn-${index}`).className += " " + "add-to-cart-btn--disabled";
  document.querySelector(`#btn-${index}`).innerHTML = "Added to Cart";
  document.querySelector(".header-toast-msg").style.display = "block";
  document.querySelector(".toast-msg-text").innerHTML = name + " is added to cart";
  setTimeout(() => {
    document.querySelector(".header-toast-msg").style.display = "none";
  }, 3000);
}

function cartBtnProRemoveItem(index) {
  document.querySelector(`#btn-${index}`).removeAttribute('disabled');
  document.querySelector(`#btn-${index}`).classList.remove("add-to-cart-btn--disabled") ;
  document.querySelector(`#btn-${index}`).innerHTML = "Add to Cart";
}

function changeQuantity(tr, type) {
  const selectedRow = tr.parentElement.parentElement;
  const displayVal = parseInt(selectedRow.getAttribute("data-display"));
  const actualVal = parseInt(selectedRow.getAttribute("data-actual"));
  const indexVal = parseInt(selectedRow.rowIndex) - 1;
  const quantity = parseInt(document.getElementsByClassName("totalCount")[indexVal].value);
  const orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const singleItemTotal = parseInt(document.getElementsByClassName("list-item-price")[indexVal].innerText);
  const updatedQuantity = type === "add" ? (quantity + 1) : (quantity - 1);

  document.getElementsByClassName("list-item-price")[indexVal].innerText = type === "add" ? (displayVal*updatedQuantity) : (singleItemTotal - displayVal);
  document.getElementsByClassName("gross-total")[0].innerText = type === "add" ? (orderTotalVal + actualVal): (orderTotalVal - actualVal);
  document.getElementsByClassName("item-total")[0].innerText = type === "add" ? (itemTotalVal + displayVal): (itemTotalVal - displayVal);
  document.getElementsByClassName("disc-total")[0].innerText = type === "add" ? (discountTotal + (displayVal - actualVal)) : (discountTotal - (displayVal - actualVal));
  document.getElementsByClassName("totalCount")[indexVal].value =  updatedQuantity;
  
  if(updatedQuantity === 1) {
    document.getElementsByClassName("sub-quant")[indexVal].setAttribute('disabled',true);
  }else {
    document.getElementsByClassName("sub-quant")[indexVal].removeAttribute('disabled');
  }
}

function removeItem(tr) {
  const selectedRow = tr.parentElement.parentElement.parentElement;
  const displayVal = parseInt(selectedRow.getAttribute("data-display"));
  const actualVal = parseInt(selectedRow.getAttribute("data-actual"));
  const dataIndex = parseInt(selectedRow.getAttribute("data-index"));
  const removedQty = parseInt(selectedRow.getElementsByClassName("totalCount")[0].value);
  const orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const getItemContainer = document.getElementsByClassName("item-details-container")[dataIndex];
  document.getElementsByClassName("item-total")[0].innerText = itemTotalVal - (displayVal * removedQty);
  document.getElementsByClassName("disc-total")[0].innerText = discountTotal - ((displayVal - actualVal) * removedQty);
  document.getElementsByClassName("gross-total")[0].innerText = orderTotalVal - (actualVal * removedQty);
  document.getElementById("cartTable").deleteRow(selectedRow.rowIndex);

  if(getItemContainer) {
    cartBtnProRemoveItem(dataIndex);
  }
}

// Calling the function which fetches JSON data on window load
window.addEventListener('load', (event) => {
  fetchItemData();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYXJrdXAvY29tcG9uZW50cy90aWxlLXZpZXcvdGlsZS12aWV3LWNvbXBvbmVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmdW5jdGlvbiB3aGljaCBmZXRjaGVzIEpTT04gZGF0YVxyXG5mdW5jdGlvbiBmZXRjaEl0ZW1EYXRhKCkge1xyXG4gIGZldGNoKFwiLi4vLi4vLi4vZGF0YS9pdGVtcy5qc29uXCIpXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJFUlJPUiBJTiBBUElcIik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKGl0ZW1EYXRhKSA9PiB7XHJcbiAgICAgIHJlbmRlckRhdGEoaXRlbURhdGEuaXRlbXMpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIHBhc3NpbmcgZGF0YSBpbnRvIHJlbmRlckRhdGEoKSBhbmQgcmVuZGVyaW5nIGl0IGludG8gRE9NXHJcbmZ1bmN0aW9uIHJlbmRlckRhdGEocmVuZGVySXRlbURhdGEpIHtcclxuICBsZXQgaXRlbUxpc3QgPSByZW5kZXJJdGVtRGF0YS5tYXAoKGRhdGEsaW5kZXgpID0+IHtcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIml0ZW0tZGV0YWlscy1jb250YWluZXJcIiBpZD1cIiR7aW5kZXh9XCIgZGF0YS1pZCA9IFwiaXRlbUlkLSR7aW5kZXh9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pbWFnZS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZGlzY291bnRcIj4gJHtkYXRhLmRpc2NvdW50fSUgb2ZmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIml0ZW0taW1hZ2VcIiBzcmM9XCIke2RhdGEuaW1hZ2V9XCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWRldGFpbHMtc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj4gJHtkYXRhLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1wcmljZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWRpc3BsYXktcHJpY2VcIiBkYXRhLWRpc3BsYXk9XCIke2RhdGEucHJpY2UuZGlzcGxheX1cIj4kJHtkYXRhLnByaWNlLmRpc3BsYXl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWFjdHVhbC1wcmljZVwiIGRhdGEtYWN0dWFsPVwiJHtkYXRhLnByaWNlLmFjdHVhbH1cIj4kJHtkYXRhLnByaWNlLmFjdHVhbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXRvLWNhcnQtYnRuXCIgaWQ9XCJidG4tJHtpbmRleH1cIiBvbkNsaWNrPVwiYWRkVG9DYXJ0KHRoaXMpXCI+IEFkZCB0byBDYXJ0IDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGB9KS5qb2luKCcgJyk7XHJcbiAgICBcclxuICAvLyBQYXNzaW5nL2FwcGVuZGluZyBsaXN0IGRhdGEgZm9yIHJlbmRlcmluZ1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbXMtdGlsZS1zZWN0aW9uXCIpLmlubmVySFRNTCA9IGl0ZW1MaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb0NhcnQoaXRlbURhdGEpIHtcclxuICBjb25zdCBpZCA9IGl0ZW1EYXRhLmdldEF0dHJpYnV0ZSgnaWQnKS5zcGxpdCgnLScpWzFdO1xyXG4gIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGl0ZW1EYXRhLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCBpdGVtTmFtZSA9IHNlbGVjdGVkSXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLW5hbWUnKVswXS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW1hZ2VVcmwgPSBzZWxlY3RlZEl0ZW0ucGFyZW50RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLWltYWdlJylbMF0uZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICBjb25zdCBpdGVtRGlzcGxheVByaWNlID0gcGFyc2VJbnQoc2VsZWN0ZWRJdGVtLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tZGlzcGxheS1wcmljZScpWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JykpO1xyXG4gIGNvbnN0IGl0ZW1BY3R1YWxQcmljZSA9IHBhcnNlSW50KHNlbGVjdGVkSXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLWFjdHVhbC1wcmljZScpWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3R1YWwnKSk7XHJcbiAgY29uc3QgaXRlbVRvdGFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCBkaXNjVG90YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IGdyb3NzVG90YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCBuZXdEaXNjb3VudCA9IGl0ZW1EaXNwbGF5UHJpY2UgLSBpdGVtQWN0dWFsUHJpY2U7XHJcblxyXG4gIC8vVXBkYXRpbmcgVG90YWwsIERpc2NvdW50ZWQgUHJpY2UsIEdyb3NzIFRvdGFsXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gIChpdGVtVG90YWwgKyBpdGVtRGlzcGxheVByaWNlKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQgPSAgKGRpc2NUb3RhbCArIG5ld0Rpc2NvdW50KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gIChncm9zc1RvdGFsICsgaXRlbUFjdHVhbFByaWNlKTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gZm9yIENhcnQgQnV0dG9uIHByb3BlcnRpZXMgY2hhbmdlIG9uIGNsaWNrLlxyXG4gIGNhcnRCdG5Qcm9wKGlkLCBpdGVtTmFtZSk7IFxyXG5cclxuICAvLyBDcmVhdGluZyBIVE1MIGZvciBJdGVtIEFkZGVkIHRvIENhcnRcclxuICBjb25zdCBodG1sVGFibGUgPSAgYDx0ciBjbGFzcz1cImNhcnQtaXRlbS1ibG9ja1wiIGlkPVwiJHtpZH1cIiBkYXRhLWRpc3BsYXk9XCIke2l0ZW1EaXNwbGF5UHJpY2V9XCIgZGF0YS1hY3R1YWw9XCIke2l0ZW1BY3R1YWxQcmljZX1cIiBkYXRhLWluZGV4PVwiJHtpZH1cIj4gXHJcbiAgPHRkPiBcclxuICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxpc3QtZGV0YWlsc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbS0tZGV0YWlsc1wiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwiaXRlbS1saXN0LWltYWdlXCIgc3JjPVwiJHtpbWFnZVVybH1cIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1saXN0LW5hbWVcIj4ke2l0ZW1OYW1lfTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbGlzdC1yZW1vdmVcIiBvbkNsaWNrPVwicmVtb3ZlSXRlbSh0aGlzKVwiPng8L2Rpdj5cclxuICAgIDwvZGl2PiBcclxuICA8L3RkPiBcclxuICA8dGQgY2xhc3M9XCJsaXN0LWl0ZW0tcXR5XCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiLVwiIGNsYXNzPVwic3ViLXF1YW50XCIgb25DbGljaz1cImNoYW5nZVF1YW50aXR5KHRoaXMsJ3JlbW92ZScpXCIgZGlzYWJsZWQ+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzaXplPVwiMTBcIiB2YWx1ZT1cIjFcIiBjbGFzcz1cInRvdGFsQ291bnRcIiBkaXNhYmxlZD5cclxuICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCIrXCIgY2xhc3M9XCJhZGQtcXVhbnRcIiBvbkNsaWNrPVwiY2hhbmdlUXVhbnRpdHkodGhpcywnYWRkJylcIj5cclxuICA8L3RkPiBcclxuICA8dGQgY2xhc3M9XCJsaXN0LWl0ZW0tcHJpY2VcIj4ke2l0ZW1EaXNwbGF5UHJpY2V9PC90ZD4gXHJcbjwvdHI+YDtcclxuXHJcbi8vVXBkYXRpbmcgRE9NIHdpdGggbmV3IEhUTUwgZm9yIENhcnRcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1pdGVtcy1saXN0XCIpLmlubmVySFRNTCArPSBodG1sVGFibGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcnRJdGVtTGVuZ3RoKCkge1xyXG4gIGNvbnN0IGNhcnRJdGVtQ291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FydC1pdGVtLWJsb2NrXCIpLmxlbmd0aDtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG90YWwtaXRlbS1udW1iZXJcIikuaW5uZXJIVE1MID0gXCJJdGVtc1wiICsgXCIoXCIgKyBjYXJ0SXRlbUNvdW50ICsgXCIpXCJcclxufVxyXG5cclxuZnVuY3Rpb24gY2FydEJ0blByb3AoaW5kZXgsIG5hbWUpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLSR7aW5kZXh9YCkuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi0ke2luZGV4fWApLmNsYXNzTmFtZSArPSBcIiBcIiArIFwiYWRkLXRvLWNhcnQtYnRuLS1kaXNhYmxlZFwiO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tJHtpbmRleH1gKS5pbm5lckhUTUwgPSBcIkFkZGVkIHRvIENhcnRcIjtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlci10b2FzdC1tc2dcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0LW1zZy10ZXh0XCIpLmlubmVySFRNTCA9IG5hbWUgKyBcIiBpcyBhZGRlZCB0byBjYXJ0XCI7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlci10b2FzdC1tc2dcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0sIDMwMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYXJ0QnRuUHJvUmVtb3ZlSXRlbShpbmRleCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tJHtpbmRleH1gKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi0ke2luZGV4fWApLmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtdG8tY2FydC1idG4tLWRpc2FibGVkXCIpIDtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLSR7aW5kZXh9YCkuaW5uZXJIVE1MID0gXCJBZGQgdG8gQ2FydFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VRdWFudGl0eSh0ciwgdHlwZSkge1xyXG4gIGNvbnN0IHNlbGVjdGVkUm93ID0gdHIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IGRpc3BsYXlWYWwgPSBwYXJzZUludChzZWxlY3RlZFJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpc3BsYXlcIikpO1xyXG4gIGNvbnN0IGFjdHVhbFZhbCA9IHBhcnNlSW50KHNlbGVjdGVkUm93LmdldEF0dHJpYnV0ZShcImRhdGEtYWN0dWFsXCIpKTtcclxuICBjb25zdCBpbmRleFZhbCA9IHBhcnNlSW50KHNlbGVjdGVkUm93LnJvd0luZGV4KSAtIDE7XHJcbiAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG90YWxDb3VudFwiKVtpbmRleFZhbF0udmFsdWUpO1xyXG4gIGNvbnN0IG9yZGVyVG90YWxWYWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCBpdGVtVG90YWxWYWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IGRpc2NvdW50VG90YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IHNpbmdsZUl0ZW1Ub3RhbCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaXN0LWl0ZW0tcHJpY2VcIilbaW5kZXhWYWxdLmlubmVyVGV4dCk7XHJcbiAgY29uc3QgdXBkYXRlZFF1YW50aXR5ID0gdHlwZSA9PT0gXCJhZGRcIiA/IChxdWFudGl0eSArIDEpIDogKHF1YW50aXR5IC0gMSk7XHJcblxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaXN0LWl0ZW0tcHJpY2VcIilbaW5kZXhWYWxdLmlubmVyVGV4dCA9IHR5cGUgPT09IFwiYWRkXCIgPyAoZGlzcGxheVZhbCp1cGRhdGVkUXVhbnRpdHkpIDogKHNpbmdsZUl0ZW1Ub3RhbCAtIGRpc3BsYXlWYWwpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncm9zcy10b3RhbFwiKVswXS5pbm5lclRleHQgPSB0eXBlID09PSBcImFkZFwiID8gKG9yZGVyVG90YWxWYWwgKyBhY3R1YWxWYWwpOiAob3JkZXJUb3RhbFZhbCAtIGFjdHVhbFZhbCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gdHlwZSA9PT0gXCJhZGRcIiA/IChpdGVtVG90YWxWYWwgKyBkaXNwbGF5VmFsKTogKGl0ZW1Ub3RhbFZhbCAtIGRpc3BsYXlWYWwpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkaXNjLXRvdGFsXCIpWzBdLmlubmVyVGV4dCA9IHR5cGUgPT09IFwiYWRkXCIgPyAoZGlzY291bnRUb3RhbCArIChkaXNwbGF5VmFsIC0gYWN0dWFsVmFsKSkgOiAoZGlzY291bnRUb3RhbCAtIChkaXNwbGF5VmFsIC0gYWN0dWFsVmFsKSk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvdGFsQ291bnRcIilbaW5kZXhWYWxdLnZhbHVlID0gIHVwZGF0ZWRRdWFudGl0eTtcclxuICBcclxuICBpZih1cGRhdGVkUXVhbnRpdHkgPT09IDEpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdWItcXVhbnRcIilbaW5kZXhWYWxdLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLHRydWUpO1xyXG4gIH1lbHNlIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdWItcXVhbnRcIilbaW5kZXhWYWxdLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW0odHIpIHtcclxuICBjb25zdCBzZWxlY3RlZFJvdyA9IHRyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IGRpc3BsYXlWYWwgPSBwYXJzZUludChzZWxlY3RlZFJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpc3BsYXlcIikpO1xyXG4gIGNvbnN0IGFjdHVhbFZhbCA9IHBhcnNlSW50KHNlbGVjdGVkUm93LmdldEF0dHJpYnV0ZShcImRhdGEtYWN0dWFsXCIpKTtcclxuICBjb25zdCBkYXRhSW5kZXggPSBwYXJzZUludChzZWxlY3RlZFJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpKTtcclxuICBjb25zdCByZW1vdmVkUXR5ID0gcGFyc2VJbnQoc2VsZWN0ZWRSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvdGFsQ291bnRcIilbMF0udmFsdWUpO1xyXG4gIGNvbnN0IG9yZGVyVG90YWxWYWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCBpdGVtVG90YWxWYWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IGRpc2NvdW50VG90YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IGdldEl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS1kZXRhaWxzLWNvbnRhaW5lclwiKVtkYXRhSW5kZXhdO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpdGVtLXRvdGFsXCIpWzBdLmlubmVyVGV4dCA9IGl0ZW1Ub3RhbFZhbCAtIChkaXNwbGF5VmFsICogcmVtb3ZlZFF0eSk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRpc2MtdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gZGlzY291bnRUb3RhbCAtICgoZGlzcGxheVZhbCAtIGFjdHVhbFZhbCkgKiByZW1vdmVkUXR5KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gb3JkZXJUb3RhbFZhbCAtIChhY3R1YWxWYWwgKiByZW1vdmVkUXR5KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcnRUYWJsZVwiKS5kZWxldGVSb3coc2VsZWN0ZWRSb3cucm93SW5kZXgpO1xyXG5cclxuICBpZihnZXRJdGVtQ29udGFpbmVyKSB7XHJcbiAgICBjYXJ0QnRuUHJvUmVtb3ZlSXRlbShkYXRhSW5kZXgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ2FsbGluZyB0aGUgZnVuY3Rpb24gd2hpY2ggZmV0Y2hlcyBKU09OIGRhdGEgb24gd2luZG93IGxvYWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcclxuICBmZXRjaEl0ZW1EYXRhKCk7XHJcbn0pOyJdLCJmaWxlIjoibWFya3VwL2NvbXBvbmVudHMvdGlsZS12aWV3L3RpbGUtdmlldy1jb21wb25lbnQuanMifQ==
