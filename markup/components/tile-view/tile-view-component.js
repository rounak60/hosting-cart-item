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
      addListener(itemData.items)
    })
    .catch((error) => {
      console.log(error);
    });
}

// passing data into renderData() and rendering it into DOM
function renderData(renderItemData) {
  let itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" data-id = "itemId-${index}">
                <div class="item-image-section">
                    <div class="item-discount"> ${data.discount}% off</div>
                    <img src="${data.image}">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn" id="btn-${index}"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
    
  // Passing/appending list data for rendering
  document.querySelector(".items-tile-section").innerHTML = itemList;
}

function addListener(data) {
  addToCartListner(data);
}

function addToCartListner(data) {
   data.map((cartBtn,index) => {
    let htmlTable = "";

    document.querySelector(`#btn-${index}`).addEventListener("click", function (e) {

      // getting all the values on the item tile for calculation
      const itemTotal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
      const discTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
      const grossTotal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
      const newDiscount = cartBtn.price.display - cartBtn.price.actual;

      document.getElementsByClassName("item-total")[0].innerText =  (itemTotal + cartBtn.price.display);
      document.getElementsByClassName("disc-total")[0].innerText =  (discTotal + newDiscount);
      document.getElementsByClassName("gross-total")[0].innerText =  (grossTotal + cartBtn.price.actual);

      cartBtnProp(index, cartBtn.name); // Function for Cart Button properties change on click.

      htmlTable =  `<tr class="cart-item-block" data-display="${cartBtn.price.display}" data-actual="${cartBtn.price.actual}" data-index="${index}"> 
                      <td> 
                        <div class="item-list-details">
                          <div class="item--details">
                            <div>
                              <img class="item-list-image" src="${cartBtn.image}">
                            </div>
                            <div class="item-list-name">${cartBtn.name}</div>
                          </div>
                          <div class="item-list-remove" onClick="removeItem(this)">x</div>
                        </div> 
                      </td> 
                      <td class="list-item-qty">
                        <input type="button" value="-" class="sub-quant" onClick="changeQuantity(this,'remove')" disabled>
                        <input type="text" size="10" value="1" class="totalCount" disabled>
                        <input type="button" value="+" class="add-quant" onClick="changeQuantity(this,'add')">
                      </td> 
                      <td class="list-item-price">$${cartBtn.price.display}</td> 
                    </tr>`
      document.querySelector(".added-items-list").innerHTML += htmlTable;
    });
  });
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
  const updatedQuantity = type === "add" ? (quantity + 1) : (quantity - 1);

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
  let selectedRow = tr.parentElement.parentElement.parentElement;
  let displayVal = selectedRow.getAttribute("data-display");
  let actualVal = selectedRow.getAttribute("data-actual");
  let dataIndex = selectedRow.getAttribute("data-index");
  const removedQty = parseInt(document.getElementsByClassName("totalCount")[0].value);
  let orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  let itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  let discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const getItemContainer = document.getElementsByClassName("item-details-container")[dataIndex];

  document.getElementsByClassName("gross-total")[0].innerText = orderTotalVal - (actualVal * removedQty);
  document.getElementsByClassName("item-total")[0].innerText = itemTotalVal - (displayVal * removedQty);
  document.getElementsByClassName("disc-total")[0].innerText = discountTotal - ((displayVal - actualVal) * removedQty);
  document.getElementById("cartTable").deleteRow(selectedRow.rowIndex);

  if(getItemContainer) {
    cartBtnProRemoveItem(dataIndex);
  }
}

// Calling the function which fetches JSON data on window load
window.addEventListener('load', (event) => {
  fetchItemData();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYXJrdXAvY29tcG9uZW50cy90aWxlLXZpZXcvdGlsZS12aWV3LWNvbXBvbmVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmdW5jdGlvbiB3aGljaCBmZXRjaGVzIEpTT04gZGF0YVxyXG5mdW5jdGlvbiBmZXRjaEl0ZW1EYXRhKCkge1xyXG4gIGZldGNoKFwiLi4vLi4vLi4vZGF0YS9pdGVtcy5qc29uXCIpXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJFUlJPUiBJTiBBUElcIik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKGl0ZW1EYXRhKSA9PiB7XHJcbiAgICAgIHJlbmRlckRhdGEoaXRlbURhdGEuaXRlbXMpO1xyXG4gICAgICBhZGRMaXN0ZW5lcihpdGVtRGF0YS5pdGVtcylcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBwYXNzaW5nIGRhdGEgaW50byByZW5kZXJEYXRhKCkgYW5kIHJlbmRlcmluZyBpdCBpbnRvIERPTVxyXG5mdW5jdGlvbiByZW5kZXJEYXRhKHJlbmRlckl0ZW1EYXRhKSB7XHJcbiAgbGV0IGl0ZW1MaXN0ID0gcmVuZGVySXRlbURhdGEubWFwKChkYXRhLGluZGV4KSA9PiB7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJpdGVtLWRldGFpbHMtY29udGFpbmVyXCIgZGF0YS1pZCA9IFwiaXRlbUlkLSR7aW5kZXh9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pbWFnZS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZGlzY291bnRcIj4gJHtkYXRhLmRpc2NvdW50fSUgb2ZmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2RhdGEuaW1hZ2V9XCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWRldGFpbHMtc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj4gJHtkYXRhLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1wcmljZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWRpc3BsYXktcHJpY2VcIiBkYXRhLWRpc3BsYXk9XCIke2RhdGEucHJpY2UuZGlzcGxheX1cIj4kJHtkYXRhLnByaWNlLmRpc3BsYXl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWFjdHVhbC1wcmljZVwiIGRhdGEtYWN0dWFsPVwiJHtkYXRhLnByaWNlLmFjdHVhbH1cIj4kJHtkYXRhLnByaWNlLmFjdHVhbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXRvLWNhcnQtYnRuXCIgaWQ9XCJidG4tJHtpbmRleH1cIj4gQWRkIHRvIENhcnQgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYH0pLmpvaW4oJyAnKTtcclxuICAgIFxyXG4gIC8vIFBhc3NpbmcvYXBwZW5kaW5nIGxpc3QgZGF0YSBmb3IgcmVuZGVyaW5nXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGVtcy10aWxlLXNlY3Rpb25cIikuaW5uZXJIVE1MID0gaXRlbUxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVyKGRhdGEpIHtcclxuICBhZGRUb0NhcnRMaXN0bmVyKGRhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb0NhcnRMaXN0bmVyKGRhdGEpIHtcclxuICAgZGF0YS5tYXAoKGNhcnRCdG4saW5kZXgpID0+IHtcclxuICAgIGxldCBodG1sVGFibGUgPSBcIlwiO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tJHtpbmRleH1gKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIC8vIGdldHRpbmcgYWxsIHRoZSB2YWx1ZXMgb24gdGhlIGl0ZW0gdGlsZSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgY29uc3QgaXRlbVRvdGFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICAgICAgY29uc3QgZGlzY1RvdGFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRpc2MtdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICAgICAgY29uc3QgZ3Jvc3NUb3RhbCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncm9zcy10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gICAgICBjb25zdCBuZXdEaXNjb3VudCA9IGNhcnRCdG4ucHJpY2UuZGlzcGxheSAtIGNhcnRCdG4ucHJpY2UuYWN0dWFsO1xyXG5cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gIChpdGVtVG90YWwgKyBjYXJ0QnRuLnByaWNlLmRpc3BsYXkpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQgPSAgKGRpc2NUb3RhbCArIG5ld0Rpc2NvdW50KTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyb3NzLXRvdGFsXCIpWzBdLmlubmVyVGV4dCA9ICAoZ3Jvc3NUb3RhbCArIGNhcnRCdG4ucHJpY2UuYWN0dWFsKTtcclxuXHJcbiAgICAgIGNhcnRCdG5Qcm9wKGluZGV4LCBjYXJ0QnRuLm5hbWUpOyAvLyBGdW5jdGlvbiBmb3IgQ2FydCBCdXR0b24gcHJvcGVydGllcyBjaGFuZ2Ugb24gY2xpY2suXHJcblxyXG4gICAgICBodG1sVGFibGUgPSAgYDx0ciBjbGFzcz1cImNhcnQtaXRlbS1ibG9ja1wiIGRhdGEtZGlzcGxheT1cIiR7Y2FydEJ0bi5wcmljZS5kaXNwbGF5fVwiIGRhdGEtYWN0dWFsPVwiJHtjYXJ0QnRuLnByaWNlLmFjdHVhbH1cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1saXN0LWRldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS0tZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIml0ZW0tbGlzdC1pbWFnZVwiIHNyYz1cIiR7Y2FydEJ0bi5pbWFnZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbGlzdC1uYW1lXCI+JHtjYXJ0QnRuLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbGlzdC1yZW1vdmVcIiBvbkNsaWNrPVwicmVtb3ZlSXRlbSh0aGlzKVwiPng8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD4gXHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsaXN0LWl0ZW0tcXR5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCItXCIgY2xhc3M9XCJzdWItcXVhbnRcIiBvbkNsaWNrPVwiY2hhbmdlUXVhbnRpdHkodGhpcywncmVtb3ZlJylcIiBkaXNhYmxlZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc2l6ZT1cIjEwXCIgdmFsdWU9XCIxXCIgY2xhc3M9XCJ0b3RhbENvdW50XCIgZGlzYWJsZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCIrXCIgY2xhc3M9XCJhZGQtcXVhbnRcIiBvbkNsaWNrPVwiY2hhbmdlUXVhbnRpdHkodGhpcywnYWRkJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGlzdC1pdGVtLXByaWNlXCI+JCR7Y2FydEJ0bi5wcmljZS5kaXNwbGF5fTwvdGQ+IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+YFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLWl0ZW1zLWxpc3RcIikuaW5uZXJIVE1MICs9IGh0bWxUYWJsZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYXJ0SXRlbUxlbmd0aCgpIHtcclxuICBjb25zdCBjYXJ0SXRlbUNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcnQtaXRlbS1ibG9ja1wiKS5sZW5ndGg7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvdGFsLWl0ZW0tbnVtYmVyXCIpLmlubmVySFRNTCA9IFwiSXRlbXNcIiArIFwiKFwiICsgY2FydEl0ZW1Db3VudCArIFwiKVwiXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcnRCdG5Qcm9wKGluZGV4LCBuYW1lKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi0ke2luZGV4fWApLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLHRydWUpO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tJHtpbmRleH1gKS5jbGFzc05hbWUgKz0gXCIgXCIgKyBcImFkZC10by1jYXJ0LWJ0bi0tZGlzYWJsZWRcIjtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLSR7aW5kZXh9YCkuaW5uZXJIVE1MID0gXCJBZGRlZCB0byBDYXJ0XCI7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXItdG9hc3QtbXNnXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdC1tc2ctdGV4dFwiKS5pbm5lckhUTUwgPSBuYW1lICsgXCIgaXMgYWRkZWQgdG8gY2FydFwiO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXItdG9hc3QtbXNnXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9LCAzMDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FydEJ0blByb1JlbW92ZUl0ZW0oaW5kZXgpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLSR7aW5kZXh9YCkucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tJHtpbmRleH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLXRvLWNhcnQtYnRuLS1kaXNhYmxlZFwiKSA7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi0ke2luZGV4fWApLmlubmVySFRNTCA9IFwiQWRkIHRvIENhcnRcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlUXVhbnRpdHkodHIsIHR5cGUpIHtcclxuICBjb25zdCBzZWxlY3RlZFJvdyA9IHRyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCBkaXNwbGF5VmFsID0gcGFyc2VJbnQoc2VsZWN0ZWRSb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaXNwbGF5XCIpKTtcclxuICBjb25zdCBhY3R1YWxWYWwgPSBwYXJzZUludChzZWxlY3RlZFJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdHVhbFwiKSk7XHJcbiAgY29uc3QgaW5kZXhWYWwgPSBwYXJzZUludChzZWxlY3RlZFJvdy5yb3dJbmRleCkgLSAxO1xyXG4gIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvdGFsQ291bnRcIilbaW5kZXhWYWxdLnZhbHVlKTtcclxuICBjb25zdCBvcmRlclRvdGFsVmFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyb3NzLXRvdGFsXCIpWzBdLmlubmVyVGV4dCk7XHJcbiAgY29uc3QgaXRlbVRvdGFsVmFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIml0ZW0tdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCBkaXNjb3VudFRvdGFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRpc2MtdG90YWxcIilbMF0uaW5uZXJUZXh0KTtcclxuICBjb25zdCB1cGRhdGVkUXVhbnRpdHkgPSB0eXBlID09PSBcImFkZFwiID8gKHF1YW50aXR5ICsgMSkgOiAocXVhbnRpdHkgLSAxKTtcclxuXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyb3NzLXRvdGFsXCIpWzBdLmlubmVyVGV4dCA9IHR5cGUgPT09IFwiYWRkXCIgPyAob3JkZXJUb3RhbFZhbCArIGFjdHVhbFZhbCk6IChvcmRlclRvdGFsVmFsIC0gYWN0dWFsVmFsKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS10b3RhbFwiKVswXS5pbm5lclRleHQgPSB0eXBlID09PSBcImFkZFwiID8gKGl0ZW1Ub3RhbFZhbCArIGRpc3BsYXlWYWwpOiAoaXRlbVRvdGFsVmFsIC0gZGlzcGxheVZhbCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRpc2MtdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gdHlwZSA9PT0gXCJhZGRcIiA/IChkaXNjb3VudFRvdGFsICsgKGRpc3BsYXlWYWwgLSBhY3R1YWxWYWwpKSA6IChkaXNjb3VudFRvdGFsIC0gKGRpc3BsYXlWYWwgLSBhY3R1YWxWYWwpKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG90YWxDb3VudFwiKVtpbmRleFZhbF0udmFsdWUgPSAgdXBkYXRlZFF1YW50aXR5O1xyXG4gIFxyXG4gIGlmKHVwZGF0ZWRRdWFudGl0eSA9PT0gMSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1Yi1xdWFudFwiKVtpbmRleFZhbF0uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgfWVsc2Uge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1Yi1xdWFudFwiKVtpbmRleFZhbF0ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSXRlbSh0cikge1xyXG4gIGxldCBzZWxlY3RlZFJvdyA9IHRyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGxldCBkaXNwbGF5VmFsID0gc2VsZWN0ZWRSb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaXNwbGF5XCIpO1xyXG4gIGxldCBhY3R1YWxWYWwgPSBzZWxlY3RlZFJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdHVhbFwiKTtcclxuICBsZXQgZGF0YUluZGV4ID0gc2VsZWN0ZWRSb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKTtcclxuICBjb25zdCByZW1vdmVkUXR5ID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvdGFsQ291bnRcIilbMF0udmFsdWUpO1xyXG4gIGxldCBvcmRlclRvdGFsVmFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyb3NzLXRvdGFsXCIpWzBdLmlubmVyVGV4dCk7XHJcbiAgbGV0IGl0ZW1Ub3RhbFZhbCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpdGVtLXRvdGFsXCIpWzBdLmlubmVyVGV4dCk7XHJcbiAgbGV0IGRpc2NvdW50VG90YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGlzYy10b3RhbFwiKVswXS5pbm5lclRleHQpO1xyXG4gIGNvbnN0IGdldEl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS1kZXRhaWxzLWNvbnRhaW5lclwiKVtkYXRhSW5kZXhdO1xyXG5cclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3Jvc3MtdG90YWxcIilbMF0uaW5uZXJUZXh0ID0gb3JkZXJUb3RhbFZhbCAtIChhY3R1YWxWYWwgKiByZW1vdmVkUXR5KTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaXRlbS10b3RhbFwiKVswXS5pbm5lclRleHQgPSBpdGVtVG90YWxWYWwgLSAoZGlzcGxheVZhbCAqIHJlbW92ZWRRdHkpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkaXNjLXRvdGFsXCIpWzBdLmlubmVyVGV4dCA9IGRpc2NvdW50VG90YWwgLSAoKGRpc3BsYXlWYWwgLSBhY3R1YWxWYWwpICogcmVtb3ZlZFF0eSk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJ0VGFibGVcIikuZGVsZXRlUm93KHNlbGVjdGVkUm93LnJvd0luZGV4KTtcclxuXHJcbiAgaWYoZ2V0SXRlbUNvbnRhaW5lcikge1xyXG4gICAgY2FydEJ0blByb1JlbW92ZUl0ZW0oZGF0YUluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIENhbGxpbmcgdGhlIGZ1bmN0aW9uIHdoaWNoIGZldGNoZXMgSlNPTiBkYXRhIG9uIHdpbmRvdyBsb2FkXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XHJcbiAgZmV0Y2hJdGVtRGF0YSgpO1xyXG59KTtcclxuIl0sImZpbGUiOiJtYXJrdXAvY29tcG9uZW50cy90aWxlLXZpZXcvdGlsZS12aWV3LWNvbXBvbmVudC5qcyJ9
