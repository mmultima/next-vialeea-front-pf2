import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = await fetch('http://localhost:8080/api/users', { cache: 'no-store' });
    return res;
}

export async function POST(request: Request) {
    const mydata = await request.json();

console.log("DATA: ", mydata);

    const res = await fetch('http://localhost:8080/api/users', { 
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: mydata
    });
    const resdata = await res.json()
    return NextResponse.json(resdata);
}