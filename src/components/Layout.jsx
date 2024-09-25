import { ModeProvider } from "../context/ModeContext";
import { ProductProvider } from "../context/ProductContext";
import Product from "./Product";
//import { Outlet } from "react-router-dom";
import { SelectedIdProvider } 
  from "../assignment/CurrentIdContext";
import { EditItemForm } from "../assignment/EditItemForm";

export function Layout(){
  return (
    <div className="App">
      <ModeProvider>
      <ProductProvider>
      {/* <SelectedIdProvider> */}
        <Product />
        {/* <EditItemForm /> */}
      {/* </SelectedIdProvider> */}
      </ProductProvider>
      </ModeProvider>
    </div>     
  );
}