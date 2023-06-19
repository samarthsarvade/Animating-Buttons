import React, { useState, useEffect } from "react";

import {
  fetchGithubData,
  handleGitHubLogin,
  handleLogout,
} from "./loginHelper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth";
import { getAuth } from "firebase/auth";
import classes from "./Login.module.css";

const Login = () => {
  const [user, setUser] = useState({ username: "", profilePictureUrl: "" });
  const [githubBio, setGithubBio] = useState("");
  const [githubSocialAccounts, setGithubSocialAccounts] = useState([]);
  // const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   console.log(user);
  // });
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchGithubData(user, setGithubBio, setGithubSocialAccounts);
      } else {
        setUser(null);
        setGithubBio("");
        setGithubSocialAccounts([]);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <button
        className={classes.loginButton}
        onClick={() => handleGitHubLogin()}
      >
        Login with GitHub
      </button>
      <button className={classes.logoutButton} onClick={() => handleLogout()}>
        Logout
      </button>
      {user ? (
        <>
          {user?.displayName}
          {user?.email}
          {user?.reloadUserInfo.screenName}
          {user?.photoURL}
        </>
      ) : (
        ""
      )} */}
      <div className={classes.container}>
        {user ? (
          <div>
            <img
              src={user.photoURL}
              alt="Profile"
              className={classes.profileImage}
            />
            <h2 className={classes.displayName}>{user.displayName}</h2>
            <p className={classes.githubBio}>{githubBio}</p>
            <ul className={classes.socialAccounts}>
              {githubSocialAccounts.map((account, index) => (
                <li key={index}>
                  <a href={account.url}>{account.name}</a>
                </li>
              ))}
            </ul>
            <button
              className={classes.logoutButton}
              onClick={() =>
                handleLogout(setGithubBio, setUser, setGithubSocialAccounts)
              }
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className={classes.loginButton}
            onClick={() => handleGitHubLogin(setUser)}
          >
            Login with GitHub
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
