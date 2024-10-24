// import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const result = await query(
      `
    SELECT 
      c.id AS campaign_id, 
      c.name AS campaign_name, 
      c.no_of_emails, 
      c.website_id, 
      w.name AS website_name, 
      c.advertiser_id, 
      a.company_name, 
      c.price, 
      c.date
    FROM campaigns c
    INNER JOIN websites w ON c.website_id = w.id
    INNER JOIN advertisers a ON c.advertiser_id = a.id
    
    `,
      []
    );

    // Create an array of objects with all the required fields
    const campaigns = result.rows
      .map((row) => ({
        campaign_id: row.campaign_id,
        campaign_name: row.campaign_name,
        no_of_emails: row.no_of_emails,
        website_id: row.website_id,
        website_name: row.website_name,
        advertiser_id: row.advertiser_id,
        company_name: row.company_name,
        price: row.price,
        date: row.date,
      }))
      .reverse();

    // Return the array of objects
    return Response.json(campaigns);
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error fetching campaigns" },
      { status: 500 }
    );
  }
}
