"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  image: string;
  title: string;
  description: string;
  defaultStyle: string;
  hoverStyle: string;
  isSelected: boolean;
  handleClick: (title: string) => void;
}

export default function Card({
  image,
  title,
  description,
  defaultStyle,
  isSelected,
  hoverStyle,
  handleClick,
}: CardProps) {
  return (
    <div
      onClick={() => handleClick(title)}
      className={cn(
        "flex flex-col grow items-center px-6 py-5 rounded-3xl min-w-[240px] w-[229px] cursor-pointer max-md:px-5",
        isSelected ? "bg-primary text-primary-foreground" : defaultStyle,
        hoverStyle
      )}
    >
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="object-contain max-w-full aspect-[1.06] w-[193px]"
      />
      <div className="flex flex-col items-center mt-6 max-w-full">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-xs text-center">{description}</p>
      </div>
    </div>
  );
}
