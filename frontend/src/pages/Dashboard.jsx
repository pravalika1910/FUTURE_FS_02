import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaUsers,
  FaUserCheck,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    status: "",
    notes: "",
  });

  // Fetch Leads
  const fetchLeads = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leads"
      );

      setLeads(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Add Lead
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/leads",
        formData
      );

      alert("Lead Added");

      setFormData({
        name: "",
        email: "",
        source: "",
        status: "",
        notes: "",
      });

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Lead
  const deleteLead = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`
      );

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {

    return (
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === ""
        ? true
        : lead.status === filter)
    );

  });

  // Stats
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-10">
          Mini CRM
        </h1>

        <ul className="space-y-4">

          <li className="bg-blue-700 p-3 rounded">
            Dashboard
          </li>

          <li className="hover:bg-blue-700 p-3 rounded cursor-pointer">
            Leads
          </li>

          <li className="hover:bg-blue-700 p-3 rounded cursor-pointer">
            Profile
          </li>

        </ul>

      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-bold">
            CRM Dashboard
          </h2>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <FaUsers className="text-3xl text-blue-500 mb-3" />
            <h3 className="text-gray-500">
              Total Leads
            </h3>
            <p className="text-2xl font-bold">
              {totalLeads}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <FaUsers className="text-3xl text-yellow-500 mb-3" />
            <h3 className="text-gray-500">
              New Leads
            </h3>
            <p className="text-2xl font-bold">
              {newLeads}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <FaUserCheck className="text-3xl text-green-500 mb-3" />
            <h3 className="text-gray-500">
              Contacted
            </h3>
            <p className="text-2xl font-bold">
              {contactedLeads}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <FaCheckCircle className="text-3xl text-purple-500 mb-3" />
            <h3 className="text-gray-500">
              Converted
            </h3>
            <p className="text-2xl font-bold">
              {convertedLeads}
            </p>
          </div>

        </div>

        {/* Add Lead Form */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">

          <h2 className="text-xl font-bold mb-5">
            Add New Lead
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-xl"
            />

            <input
              type="text"
              name="source"
              placeholder="Source"
              value={formData.source}
              onChange={handleChange}
              className="p-3 border rounded-xl"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border rounded-xl"
            >
              <option value="">
                Select Status
              </option>
              <option value="New">
                New
              </option>
              <option value="Contacted">
                Contacted
              </option>
              <option value="Converted">
                Converted
              </option>
            </select>

            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="p-3 border rounded-xl md:col-span-2"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Add Lead
            </button>

          </form>

        </div>

        {/* Leads Table */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">

            {/* Search */}
            <div className="flex items-center border rounded-xl px-3">

              <FaSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search Leads"
                className="p-2 outline-none"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* Filter */}
            <select
              className="border p-2 rounded-xl"
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="">
                All Status
              </option>
              <option value="New">
                New
              </option>
              <option value="Contacted">
                Contacted
              </option>
              <option value="Converted">
                Converted
              </option>
            </select>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Email
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredLeads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {lead.name}
                    </td>

                    <td className="p-3">
                      {lead.email}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          lead.status === "New"
                            ? "bg-yellow-500"
                            : lead.status ===
                              "Contacted"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      >
                        {lead.status}
                      </span>

                    </td>

                    <td className="p-3 flex gap-3">

                      <button className="bg-blue-500 text-white p-2 rounded-lg">
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteLead(lead.id)
                        }
                        className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;