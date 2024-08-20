export async function GET(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;
    const res = await fetch('http://localhost:8080/nethys/equipment/gear/' + id, { cache: 'no-store' })
    return res;
    }