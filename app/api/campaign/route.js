import { query } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get("campaign_id");

  if (!campaignId) {
    return Response.json(
      { message: "Campaign ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await query(
      `
      SELECT 
        (SELECT COUNT(*) FROM emails_sent es WHERE es.campaign_id = $1) AS emails_sent_count,
        (SELECT COUNT(*) FROM emails_open eo WHERE eo.campaign_id = $1) AS emails_open_count,
        (SELECT COUNT(*) FROM emails_unsubscribe eu WHERE eu.campaign_id = $1) AS emails_unsubscribe_count,
        (SELECT COUNT(*) FROM emails_sent es WHERE es.campaign_id = $1 AND es.status = 'success') AS emails_success_count,
        (SELECT COUNT(*) FROM emails_sent es WHERE es.campaign_id = $1 AND es.status = 'failed') AS emails_failed_count
      `,
      [campaignId]
    );

    if (result.rows.length === 0) {
      return Response.json({ message: "Campaign not found" }, { status: 404 });
    }

    const counts = result.rows[0];

    // Convert the counts to numbers
    return Response.json({
      emails_sent_count: parseInt(counts.emails_sent_count, 10),
      emails_open_count: parseInt(counts.emails_open_count, 10),
      emails_unsubscribe_count: parseInt(counts.emails_unsubscribe_count, 10),
      emails_success_count: parseInt(counts.emails_success_count, 10),
      emails_failed_count: parseInt(counts.emails_failed_count, 10),
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error fetching campaign email counts" },
      { status: 500 }
    );
  }
}
