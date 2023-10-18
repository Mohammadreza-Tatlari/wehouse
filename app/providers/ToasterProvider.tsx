'use client'
//we can replace failer messages by ToasterProvider and it is used and wrapped by clientOnly 

import { Toaster } from "react-hot-toast"

export default function ToasterProvider() {
  return (
    <Toaster />
  )
}
