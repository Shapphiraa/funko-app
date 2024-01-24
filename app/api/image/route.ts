import { NextResponse } from 'next/server'
import ImageKit from 'imagekit'

export const dynamic = 'force-dynamic'

export async function GET() {
  const imagekit = new ImageKit({
    urlEndpoint: `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}`,
    publicKey: `${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
  })

  const result = imagekit.getAuthenticationParameters()

  return NextResponse.json(result)
}
