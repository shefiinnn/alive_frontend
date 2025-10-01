import { useEffect, useState } from "react";
import api from "../../utils/api";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  number: string;
  message: string;
  replied: boolean;
  recieved_at: string;
};

export function EnquiriesList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const response = await api.get("/enquiries/");
        setEnquiries(response.data);
        setLoading(false);
      } catch {
        setError("Failed to load enquiries.");
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  const handleRepliedChange = async (id: number, newValue: boolean) => {
    try {
      await api.patch(`/enquiries/${id}/`, { replied: newValue });
      setEnquiries((prev) =>
        prev.map((enq) =>
          enq.id === id ? { ...enq, replied: newValue } : enq
        )
      );
      setEditingId(null);
    } catch {
      alert("Failed to update replied status");
    }
  };

  if (loading) return <p>Loading enquiries...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enquiries</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Number</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Replied</th>
            <th className="border p-2">Actions</th>
            <th className="border p-2">Received At</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td className="border p-2">{enquiry.name}</td>
              <td className="border p-2">{enquiry.email}</td>
              <td className="border p-2">{enquiry.number}</td>
              <td className="border p-2">{enquiry.message}</td>
              <td className="border p-2 text-center">
                {editingId === enquiry.id ? (
                  <>
                    <label className="mr-2">
                      <input
                        type="radio"
                        name={`replied-${enquiry.id}`}
                        checked={enquiry.replied === true}
                        onChange={() => handleRepliedChange(enquiry.id, true)}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`replied-${enquiry.id}`}
                        checked={enquiry.replied === false}
                        onChange={() => handleRepliedChange(enquiry.id, false)}
                      />
                      No
                    </label>
                  </>
                ) : (
                  enquiry.replied ? "Yes" : "No"
                )}
              </td>
              <td className="border p-2 text-center">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() =>
                    setEditingId(editingId === enquiry.id ? null : enquiry.id)
                  }
                >
                  {editingId === enquiry.id ? "Close" : "Edit"}
                </button>
              </td>
              <td className="border p-2">
                {new Date(enquiry.recieved_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
