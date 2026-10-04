"use client";

import React, { useState } from 'react'

const page = () => {

  const [status, setStatus] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  const reader = new FileReader();
  reader.onload = async (e2) => {

    const src = e2.target?.result as string;
    setImage(src);
    setBoxes([]);

  }

  return (
    <div>page</div>
  )
}

export default page