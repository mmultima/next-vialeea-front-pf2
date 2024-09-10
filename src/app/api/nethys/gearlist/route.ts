//export async function GET(request: Request, { params }: { params: { par: string } }) {
export async function GET(request: Request) {
    //const id = params.par;
    //const res = await fetch('http://localhost:8080/nethys/gearList/' + id, { cache: 'no-store' });
    const res = await fetch('http://localhost:8080/nethys/gearList/' + "asdf", { cache: 'no-store' });
    return res;
}