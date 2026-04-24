export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const response = await fetch("https://api.fireflies.ai/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIREFLIES_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query {
          transcripts {
            id
            title
            date
          }
        }
      `
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}