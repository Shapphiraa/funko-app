import { NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import ImageKit from 'imagekit'

export async function GET() {
  const imagekit = new ImageKit({
    urlEndpoint: `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}`,
    publicKey: `${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY}`,
  })

  const result = imagekit.getAuthenticationParameters()

  return NextResponse.json(result)
}
