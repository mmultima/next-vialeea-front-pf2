import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;
  
    console.log("p WHAT?", id);
  
    const mydata = await request.json();
  
    console.log("p DATA: ", mydata);
    /*
    const res = await fetch('http://localhost:8080/api/pfcharacters/' + id, { 
      method: 'POST',
      cache: 'no-store' 
    });
  
    */
    const res = await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + id, { 
  
    //const res = await fetch('http://localhost:8080/api/pfcharacters/', { 
      cache: 'no-store',
      method: 'PUT',
  //    method: 'POST',
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
  
    console.log("P Response: ", resdata);
    
    
  
  
  
    //const output = params ? params.par : "Test 3";
    //return mydata; //NextResponse.json({res});
  
  
    return NextResponse.json(resdata);
  }

  export async function GET(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;
    const res = await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + id, { cache: 'no-store' })
    return res;
  }