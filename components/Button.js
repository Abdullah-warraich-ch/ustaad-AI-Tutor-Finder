"use client";

import React from "react";
import Link from "next/link";

export default function Button({
  children,
  text,
  textColor = "text-color1",             // Default: Light text
  bgColor = "bg-color4",                 // Default: Orange background
  hoverTextColor = "",                   // Default: Keep text color
  hoverBgColor = "hover:bg-color4/90",   // Default: Muted orange hover
  textSize = "text-sm",                  // Default: Small text
  padding = "px-6 py-2.5",               // Default: 24px horiz, 10px vert padding
  rounded = "rounded-full",              // Default: Fully rounded
  className = "",
  href,
  onClick,
  type = "button",
  ...props
}) {
  // Combine core styles with configurable prop values
  const buttonStyles = `
    inline-block 
    font-semibold 
    ${rounded} 
    transition-all 
    duration-300 
    text-center
    ${textColor} 
    ${bgColor} 
    ${hoverTextColor} 
    ${hoverBgColor} 
    ${textSize} 
    ${padding} 
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children || text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonStyles} {...props}>
      {children || text}
    </button>
  );
}
