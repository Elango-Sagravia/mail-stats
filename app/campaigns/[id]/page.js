async function getData(params) {
  const response = await fetch(
    `${process.env.url}/api/campaign?campaign_id=${params.id}`
  );
  return await response.json();
}
export default async function Home({ params }) {
  const data = await getData(params);

  console.log(data);

  return (
    <div>
      <p>Total emails sent: {data.emails_sent_count}</p>
      <p>Total emails delivered successfully: {data.emails_success_count}</p>
      <p>Total failed emails: {data.emails_failed_count}</p>
      <p>Total emails opened: {data.emails_open_count}</p>
      <p>Total emails unsubscribed: {data.emails_unsubscribe_count}</p>
    </div>
  );
}
