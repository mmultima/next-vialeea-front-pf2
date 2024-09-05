export async function GET(request: Request) {
    const res = await fetch('http://localhost:8080/nethys/classes', { cache: 'no-store' });
    return res;
}