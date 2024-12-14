import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const {id} = useParams()
  const [name , setname] = useState("")
  const [profileImage , setProfileImage] = useState("")
  const [email , setEmail] = useState("")

  useEffect(() => {
    const fetchUser = async
  },[])

  return (
    <>
      
    </>
  );
}

export default UpdateUser;
