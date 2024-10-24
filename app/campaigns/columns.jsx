"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// Define the columns for the campaigns_data
export const columns = [
  {
    accessorKey: "campaign_name",
    header: "Campaign Name",
    cell: ({ row }) => (
      <Link href={`/campaigns/${row.original.campaign_id}`}>
        {row.original.campaign_name}
      </Link>
    ),
  },
  {
    accessorKey: "no_of_emails",
    header: "No. of Emails",
  },
  {
    accessorKey: "website_name",
    header: "Website Name",
  },
  {
    accessorKey: "company_name",
    header: "Advertiser",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      // Convert to Indian Standard Time (IST) and format as '12 Oct 2024'
      return date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
];
