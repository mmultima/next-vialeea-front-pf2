import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { par: string } }) {
  const id = params.par;
  const res = await fetch('http://localhost:8080/api/users/' + id, { cache: 'no-store' })
  return res;
}

export async function POST(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;

    const mydata = await request.json();

    const res = await fetch('http://localhost:8080/api/users/' + id, { 
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

export async function PUT(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;

    const mydata = await request.json();

    const res = await fetch('http://localhost:8080/api/users/' + id, { 
        cache: 'no-store',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mydata)
    });

    const resdata = await res.json()

    return NextResponse.json(resdata);
}