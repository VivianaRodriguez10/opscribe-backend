export default async function handler(req, res) {
  const { id } = req.query;

  const response = await fetch("https://api.fireflies.ai/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIREFLIES_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query Transcript($id: String!) {
          transcript(id: $id) {
            title
            sentences {
              text
              speaker_name
            }
          }
        }
      `,
      variables: { id }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}