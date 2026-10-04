"use client";

import { pipeline } from '@huggingface/transformers';
import React, { useState } from 'react'


const page = () => {

  const [status, setStatus] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<any[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e2) => {

      const src = e2.target?.result as string;
      setImage(src);
      setBoxes([]);
      setStatus("Loading Model & Analyzing...")

      const detector = await pipeline(
        "object-detection",
        "Xenova/detr-resnet-50"
      );

      const output = await detector(src, {
        threshold: 0.5,
        percentage: true,
      });

      setBoxes(output);
      setStatus("Done!");

    };

    reader.readAsDataURL(file);
  };

  return (
    <div>page</div>
  )
}

export default page