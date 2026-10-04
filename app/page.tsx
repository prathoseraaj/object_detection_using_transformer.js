"use client";

import React, { useState } from 'react'

const page = () => {

  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [boxes, setBoxes] = useState([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };


  



  return (
    <div>page</div>
  )
}

export default page