export async function POST(request: Request) {
  const res = await fetch(`${process.env.API_URL}/interview/social`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: request.body,
  });
  const data = await res.json();
  return Response.json(data);
}
