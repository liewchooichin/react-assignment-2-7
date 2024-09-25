

import styles from "./ViewList.module.css";
import { useContext } from 'react';
import ModeContext from '../context/ModeContext';
import { Link } from "react-router-dom";


function ViewList({ 
  list, sum, 
  handlerDeleteItem, handlerEditItem,
  isShowEditForm,
 }) {
  const modeCtx = useContext(ModeContext);
  return (
    <div>
      <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Count</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Total $</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{Number.parseFloat(item.total).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handlerEditItem(item)}
                  >Edit</button></td>
              
              <td> 
                <button
                  type="button"
                  onClick={() => handlerDeleteItem(item.id)}
                  disabled={isShowEditForm}
                >Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.containerSum}>
        Total sum: <span className={styles.sum}>{sum.toFixed(2)}</span>
      </div>
    </div>
  );
}
export default ViewList;
