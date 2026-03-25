import SubscriberTable from "../../components/admin/subscriberTable";
export default function SubscribeList() {
  return (
    <main className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="max-w-4xl flex items-center justify-between">
        <h1>Subscribers List</h1>
      </div>
      {/* all blogs table */}
      <div className="mt-6 scroll-auto h-full">
        {" "}
        <SubscriberTable />
      </div>
    </main>
  );
}
