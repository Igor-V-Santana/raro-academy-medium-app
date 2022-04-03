import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navigation = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if(token){
      setIsLogin(true);
    }
  }, [])

  function logout(){
    localStorage.clear();
    setIsLogin(false)
  }

  return (
      <>
        {isLogin ? 
        <>
          <Link to="/">HOME</Link>
          <Link to="/artigos">MEUS ARTIGOS</Link>
          <Link to="/artigos/novo">NOVO ARTIGO</Link>
          <Link to="/" onClick={logout}>LOGOUT</Link>
        </> 
        : 
        <>
          <Link to="/">HOME</Link>
          <Link to="/login">LOGIN</Link>
        </>
      }
      </>
  );
};