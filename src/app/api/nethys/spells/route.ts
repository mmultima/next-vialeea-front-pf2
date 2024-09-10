export async function GET(request: Request) {
    // Parse the request URL
    const url = new URL(request.url);
    
    // Extract query parameters
    const params = url.searchParams;
    
    // Example: Get a specific parameter
    const someParam = params.get('someParam');

    const res = await fetch('http://localhost:8080/nethys/spells?' + params, { cache: 'no-store' });
    return res;
}