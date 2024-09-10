export async function GET(request: Request, { params }: { params: { par: string } }) {
    const id = params.par;
    const res = await fetch('http://localhost:8080/nethys/featlist/' + id, { cache: 'no-store' })
    return res;
}