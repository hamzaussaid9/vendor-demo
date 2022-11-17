import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ReRoute = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/not-found');
    },[]) 
  return <></>;
}

export default ReRoute