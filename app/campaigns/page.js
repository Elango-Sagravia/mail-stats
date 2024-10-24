import { DataTable } from "./DataTable";
import { columns } from "./columns";

// Fetch data directly in the component as an async function
async function getData() {
  const response = await fetch(`${process.env.url}/api/campaigns`, {
    cache: "no-store", // Prevent caching for fresh data on every request
  });
  return await response.json();
}

export default async function Campaigns() {
  const data = await getData(); // Fetch the data

  return (
    <div>
      <h1 className="text-2xl">Campaigns</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
