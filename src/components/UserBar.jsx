
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./UserBar.module.css";

function UserBar() {
  const userCtx = useContext(UserContext);
  const { 
    isLoggedIn, 
    credentials, 
    handleCredentialsChange, 
    handleLogin, 
    handleLogout } = userCtx;

  if(isLoggedIn){
    return(
      <div className={styles.userBarContainer}>
        <h3>Welcome.</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }
  /**Else: Implied */
  return (
    <div className={styles.userBarContainer}>
      <form className={styles.userBarForm} onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input name="username" value={credentials.username} onChange={handleCredentialsChange} />
        <label>password</label>
        <input name="password" value={credentials.password} onChange={handleCredentialsChange} type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserBar;
