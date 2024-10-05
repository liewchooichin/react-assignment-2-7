import { ModeProvider } from "../context/ModeContext";
import { ProductProvider } from "../context/ProductContext";
import Product from "./Product";



export function Layout(){
  return (
    <div className="App">
      <h2>Env variables</h2>
      <h3>Built-in env variables</h3>
      <ul>
        <li>import.meta.env.MODE={import.meta.env.MODE}</li>
        <li>import.meta.env.BASE_URL={import.meta.env.BASE_URL}</li>
        <li>import.meta.env.PROD={import.meta.env.PROD}</li>
        <li>import.meta.env.DEV={import.meta.env.DEV}</li>
        <li>import.meta.env.SSR={import.meta.env.SSR}</li>
      </ul>
      <h3>User-defined env variables</h3>
      <p>import.meta.env.VITE_KEY_1={import.meta.env.VITE_KEY_1}</p>
      <p>import.meta.env.VITE_KEY_2={import.meta.env.VITE_KEY_2}</p>
      <p>import.meta.env.VITE_KEY_1={import.meta.env.VITE_LOCAL_KEY_1}</p>
      <p>import.meta.env.VITE_KEY_2={import.meta.env.VITE_LOCAL_KEY_2}</p>
      <p>import.meta.env.VITE_KEY_1={import.meta.env.VITE_LOCAL_KEY_1}</p>
      <p>import.meta.env.VITE_KEY_2={import.meta.env.VITE_LOCAL_KEY_2}</p>
      <p>import.meta.env.VITE_MY_AZURE_KEY_1={import.meta.env.VITE_MY_AZURE_KEY_1}</p>
      <p>import.meta.env.VITE_MY_AZURE_KEY_2={import.meta.env.VITE_MY_AZURE_KEY_2}</p>

      <ModeProvider>
      <ProductProvider>
        <Product />
      </ProductProvider>
      </ModeProvider>
    </div>     
  );
}