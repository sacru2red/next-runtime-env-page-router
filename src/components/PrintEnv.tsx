'use client'
import { env } from "next-runtime-env"

const PrintEnv = () => {
  const FOO = env('NEXT_PUBLIC_FOO')
  console.log('FOO', FOO)
  return <h2>FOO: {FOO}</h2>
}

export default PrintEnv
