import { query } from "@/lib/db";

export async function GET(req) {
  // Extract startDate and endDate from the query parameters
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  // Ensure startDate and endDate are provided
  if (!startDate || !endDate) {
    return new Response(
      JSON.stringify({ error: "start_date and end_date are required" }),
      {
        status: 400,
      }
    );
  }

  try {
    // Updated SQL query to ensure counts are returned as numbers
    const result = await query(
      `
      SELECT 
        w.id AS website_id,
        w.name AS website_name,
        COUNT(DISTINCT es.id)::int AS emails_sent_count,
        COUNT(DISTINCT eo.id)::int AS emails_open_count,
        COUNT(DISTINCT eu.user_id)::int AS emails_unsubscribe_count,
        COUNT(DISTINCT CASE WHEN es.status = 'active' THEN es.id END)::int AS success_emails_sent_count,
        COUNT(DISTINCT CASE WHEN es.status = 'failed' THEN es.id END)::int AS failed_emails_sent_count
      FROM websites w
      LEFT JOIN campaigns c ON w.id = c.website_id AND c.date BETWEEN $1 AND $2
      LEFT JOIN emails_sent es ON c.id = es.campaign_id
      LEFT JOIN emails_open eo ON c.id = eo.campaign_id
      LEFT JOIN emails_unsubscribe eu ON c.id = eu.campaign_id
      GROUP BY w.id
    `,
      [startDate, endDate]
    );

    // Return only the rows from the result
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching data" }),
      {
        status: 500,
      }
    );
  }
}
