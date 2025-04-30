import React from 'react'

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-green-100 h-screen">
      { children}
    </div>
  )
}
