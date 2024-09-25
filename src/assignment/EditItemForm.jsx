//import { Form } from "react-router-dom";
import "./mystyles.css";
import { useState } from "react";


export function EditItemForm({
  item, setItem, 
  productList, setProductList,
  isShowEditForm, setIsShowEditForm,
}){
  /**Count the subtotal */
    function getSubtotal(currCount, currPrice, currDiscount){
    return (currCount * currPrice * (100-currDiscount)/100);
  }
  /**Handler */
  function handleNameChange(e){
    console.log("Name change");
    setItem({...item, name: e.target.value});
  }
  function handleCountChange(e){
    console.log("Count change");
    const newCount = Number.parseInt(e.target.value);
    const currPrice = item.price;
    const currDiscount = item.discount;
    const newTotal = getSubtotal(newCount, currPrice, currDiscount);
    setItem({...item, count: newCount, total: newTotal});
  }
  function handlePriceChange(e){
    console.log("Price change");
    const newPrice = Number.parseFloat(e.target.value);
    const currCount = item.count;
    const currDiscount = item.discount;
    const newTotal = getSubtotal(currCount, newPrice, currDiscount);
    setItem({...item, price: newPrice, total: newTotal});
  }
  function handleDiscountChange(e){
    console.log("Discount change");
    const newDiscount = Number.parseFloat(e.target.value);
    const currCount = item.count;
    const currPrice = item.price;
    const newTotal = getSubtotal(currCount, currPrice, newDiscount);
    setItem({...item, discount: newDiscount, total: newTotal});
  }

  // Update the currently edited item into the product list
  function handleBtnUpdate(e){
    // the item state has already been updated at every
    // event change. So, at update, only need to update 
    // the current item state to the product list.
    const newList = productList.map((i)=>{
      if(i.id === item.id){
        return item; //newItem;
      } else {
        return i;
      }
    })
    setProductList(newList);
  }

  // Cancel the changes, revert to the original value
  function handleBtnRevert(e){
    // The product list is not updated at every
    // event change, so the original value is 
    // still in the product list.
    // Get the original value from the product list.
    const originalItem = productList.find((i)=>(
      i.id === item.id
    ))
    // update the form to the original value
    setItem({...item, 
      name: originalItem.name,
      count: originalItem.count,
      price: originalItem.price,
      discount: originalItem.discount,
      total: originalItem.total,
    });
    // no need to update product list
  }

  function handleBtnClose(e){
    // Close the edit form
    // Ignore the changes in the form.
    // The product list will not be updated.
    setIsShowEditForm(false);
  }

  return(
    <div className="editForm"  /* style={{width:"400px", height:"500px"}} */>
      <form>
        <label>Id:</label>
          <input
            type="text"
            name="id"
            value={item.id}
            readOnly
            disabled
           ></input> 
        
        <label>Name</label>
          <input 
            type="text"
            name="name"
            value= {item.name}
            onChange={(e)=>(handleNameChange(e))}
            disabled={!isShowEditForm}
           ></input> 

        <label>Count</label>
        <input
          type="number"
          name="count"
          value={item.count}
          onChange={(e)=>(handleCountChange(e))}
          disabled={!isShowEditForm}
        ></input>
        
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={(e)=>(handlePriceChange(e))}
          disabled={!isShowEditForm}
        ></input>

        <label>Discount</label>
        <input
          type="number"
          name="discount"
          value={item.discount}
          onChange={(e)=>(handleDiscountChange(e))}
          disabled={!isShowEditForm}
        ></input>

        <label>Total</label>
        <input
          type="number"
          name="discount"
          value={item.total}
          readOnly
          disabled
        ></input>

        <div className="buttonAndText">
        <button
          type="button"
          name="btnSubmit"
          onClick={handleBtnUpdate}
        >Update</button>
        <small>Update the changes into the product list</small>
        </div>

        <div className="buttonAndText">
        <button
          type="button"
          name="btnRevert"
          onClick={handleBtnRevert}
        >Revert</button>
        <small>Cannot revert changes once updated.</small>
        </div>

        <div className="buttonAndText">
        <button
          type="button"
          name="btnClose"
          onClick={handleBtnClose}
        >Close</button>
        <small>Close the form</small>
        </div>
      </form>
    </div>
  )
}