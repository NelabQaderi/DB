'use client';

import { Image } from "@mantine/core";
import { useState, useEffect } from "react";

interface ImageDisplayProps {
    url: string,
    name: string,
}

const ImageDisplay = (
  {url, name}: ImageDisplayProps,
) => {

  return (
    <>
        <Image
            src={`/${url.replace(/.*students_image/, "students_image")}`}
            height={460}
            alt={name}
        />
    </>
  )
}

export default ImageDisplay
