import { type NextRequest, NextResponse } from "next/server"

// Demo payment processing endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, method, userId } = body

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would integrate with Stripe, PayPal, etc.
    // For demo purposes, we'll just return a success response

    const transactionId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      success: true,
      transactionId,
      amount,
      method,
      status: "completed",
      message: "Demo payment processed successfully",
      timestamp: new Date().toISOString(),
      disclaimer: "This is a demo transaction. No real money was processed.",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Payment processing failed",
        message: "Demo payment simulation error",
      },
      { status: 500 },
    )
  }
}
