import { useState, useContext, useMemo } from 'react';
//import { v4 as uuid } from 'uuid';
import styles from './Product.module.css'
import Card from './Card';
import ViewList from './ViewList';
import Button from './Button';

import ProductContext from '../context/ProductContext';
import ModeContext from '../context/ModeContext';
import Toggle from './Toggle';
import { simpleId } from '../assignment/Utils';
import { EditItemForm } from '../assignment/EditItemForm';
import { initialProductList } from '../reducers/initialProductList';


function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState(initialProductList);
  const [isListVisible, setIsListVisible] = useState(true);

  // state to disable the delete button when editing is
  // ongoing.
  // state to show the edit form based on edit item detail
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleShowList(){
    const newState = !isListVisible;
    setIsListVisible(newState);
  }

  // UseMemo

  // sum 
  function getSumTotal(){
    list.reduce((acc, item) => {
        return (acc + item.total);
      }, 0);
  }

  const currentSubtotal = useMemo(() => {
    //console.log("Calculate subtotal");
    return (ctx.count * ctx.price * (100-ctx.discount)/100);
  }, [ctx.count, ctx.price, ctx.discount]);

  // Grand total
  const sumTotal = useMemo(() => {
    //console.log("recalculating sumTotal");
    return list.reduce((acc, item) => {
      return (acc + item.total);
    }, 0);
  }, [list]);

  // delete an item
  function handlerDeleteItem(id){
    // console.log(e.currentTarget.dataset.id);
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  // Add product
  const handlerAddProduct = () => {
    // Create new list item
    const newItem = {
      id: simpleId(),
      name: ctx.name,
      count: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * (100-ctx.discount)/100,
   } 
   // Copy previous list and append new item to its end
   const newList = [...list, newItem];
  //  console.log('  newList:', newList);
   setList(newList);
  }

  // Edit form to edit an item
  function handlerEditItem(item) {
    //console.log("edit item " + id);
    // Set the selected id for the edit form
    //selectedIdCtx.setSelectedId(id);
    // Show edit form
    const newShowEditForm = true;
    setIsShowEditForm(newShowEditForm);
    // Set the selected item
    console.log("Handle edit item");
    console.log(item);
    setSelectedItem({
      ...item,
      id: item.id,
      name: item.name,
      count: item.count,
      price: item.price,
      discount: item.discount,
      total: item.total,
    });
   }
   
  // Method 1: conditional rendering: if/else
  let listComponent = null;
  // if visible, show the list
  if(isListVisible){
    listComponent = (
      <ViewList 
        list={list} 
        sum={sumTotal}
        handlerDeleteItem={handlerDeleteItem} 
        handlerEditItem={handlerEditItem}
        isShowEditForm={isShowEditForm}/>
    );
  } else {
    listComponent = (<p>Click <b>Show Cart</b> to display the cart.</p>)
  }

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card
        handlerAddProduct={handlerAddProduct}
      />
      <p>Current subtotal: ${currentSubtotal.toFixed(2)}</p>
      <Button 
        label={isListVisible ? "Hide Cart" : "Show Cart"}
        type="button"
        onClick={(e)=>handleShowList(e)}
      ></Button>
      {listComponent}
      {isShowEditForm && <EditItemForm 
        item={selectedItem} 
        setItem={setSelectedItem}
        productList={list}
        setProductList={setList}
        isShowEditForm={isShowEditForm}
        setIsShowEditForm={setIsShowEditForm} />}
    </div>
  );
}
export default Product;
