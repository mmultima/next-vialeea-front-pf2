export async function GET(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;

    console.log("GET ID: ", id);
    
    const res = await fetch('http://localhost:8080/api/pfcharacters/castings/' + id, { cache: 'no-store' })
    
    console.log("GET Response: ", res); 

    return res;
}

export async function PUT(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;

    const mydata = await request.json();
    const res = await fetch('http://localhost:8080/api/pfcharacters/castings/' + id, { 
        cache: 'no-store',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mydata)
    });

    const resdata = await res.json()

    return resdata;
}