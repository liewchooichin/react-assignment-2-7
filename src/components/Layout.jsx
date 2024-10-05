import { ModeProvider } from "../context/ModeContext";
import { ProductProvider } from "../context/ProductContext";
import Product from "./Product";

export function Layout(){
  return (
    <div className="App">
      <ModeProvider>
      <ProductProvider>
        <Product />
      </ProductProvider>
      </ModeProvider>
    </div>     
  );
}