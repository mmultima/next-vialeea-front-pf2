import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const mydata = await request.json();

  const res = await fetch('http://localhost:8080/api/pfcharacters/castings', { 
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mydata)
  });

  const resdata = await res.json()  
  return NextResponse.json(resdata);
}