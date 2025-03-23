import { cookies } from "next/headers"

export async function POST(request: Request) {
    cookies().delete("authToken")
    return Response.json({ success: true })
}