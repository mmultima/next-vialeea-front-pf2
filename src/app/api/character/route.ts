import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ mydata: "Test" })
}

export async function POST(request: Request) {
  const mydata = await request.json();

  console.log("DATA: XYZ ; ", mydata);

  const res = await fetch('http://localhost:8080/api/pfcharacters', { 
  
    //const res = await fetch('http://localhost:8080/api/pfcharacters/', { 
      cache: 'no-store',
      //method: 'PUT',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  /*    headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },*/
  
      body: mydata
    });
  
    const resdata = await res.json()
  
    console.log("POST Response: ", resdata);
    
    
  
  
  
    //const output = params ? params.par : "Test 3";
    //return mydata; //NextResponse.json({res});
  
  
    return NextResponse.json(resdata);
}