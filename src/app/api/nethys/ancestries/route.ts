export async function GET(req: Request): Promise<Response> {
  const res = await fetch('http://localhost:8080/nethys/ancestries/', { cache: 'no-store' });
  return res;
}