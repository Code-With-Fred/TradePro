import { type NextRequest, NextResponse } from "next/server"

// Ethical referral tracking for demo purposes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralCode, userId } = body

    // Generate a demo referral link
    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/ref/${referralCode}`

    return NextResponse.json({
      success: true,
      referralCode,
      referralLink,
      message: "Demo referral link generated",
      disclaimer: "This is for demonstration purposes only",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate referral link" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Referral code required" }, { status: 400 })
  }

  // Track referral visit (ethical tracking for demo)
  const visitData = {
    referralCode: code,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    ip: request.ip || "unknown",
  }

  // In a real app, you'd store this in a database
  console.log("Demo referral visit tracked:", visitData)

  return NextResponse.json({
    success: true,
    message: "Referral visit tracked",
    data: visitData,
  })
}
