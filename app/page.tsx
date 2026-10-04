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
    <div className='p-8 max-w-xl mx-auto font-sans'>
      <h1 className='text-xl font-bold mb-4'>Transformers.js Object Detector</h1>
      <input type="file"
        accept='image/'
        onChange={handleUpload}
        className='mb-4' />
      {status && (
        <p className='text-sm text-gray-500 mb-2'>{status}</p>
      )}
      {image && (
        <div className='relative border rounded overflow-hidden'>
          <img src={image}
            alt="Uploaded"
            className='w-full h-auto block' />
          {boxes.map((item, index) => {
            const { xmin, ymin, xmax, ymax } = item.box;
            return (
              <div
                key={index}
                className="absolute border-2 border-red-500 pointer-events-none"
                style={{
                  left: `${xmin * 100}%`,
                  top: `${ymin * 100}%`,
                  width: `${(xmax - xmin) * 100}%`,
                  height: `${(ymax - ymin) * 100}%`,
                }}
              >
                <span className="absolute -top-5 left-0 bg-red-500 text-white text-xs px-1">
                  {item.label} ({(item.score * 100).toFixed(0)}%)
                </span>
              </div>
            );
          })};
        </div>
      )}
    </div>
  )
}

export default page