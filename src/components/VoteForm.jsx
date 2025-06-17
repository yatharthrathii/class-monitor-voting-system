import { useState } from "react";
import { useVote } from "../context/VoteContextApi";
import { PlusCircle, XCircle } from "lucide-react";

const VoteForm = () => {
  const { candidates, addVote } = useVote();
  const [voterName, setVoterName] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleVote = (e) => {
    e.preventDefault();
    if (!voterName || !selectedCandidate) {
      alert("Please fill all fields");
      return;
    }
    addVote(voterName, selectedCandidate);
    setVoterName("");
    setSelectedCandidate("");
    setShowForm(false);
  };

  return (
    <div className="text-center my-6 px-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className={`flex items-center gap-2 mx-auto text-white px-5 py-2 rounded-lg font-medium shadow-md transition duration-200 ${showForm ? "bg-rose-500 hover:bg-rose-600" : "bg-violet-600 hover:bg-violet-700"
          }`}
      >
        {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
        {showForm ? "Cancel" : "Add New Vote"}
      </button>

      {showForm && (
        <form
          onSubmit={handleVote}
          className="mt-6 max-w-md mx-auto bg-white border border-violet-100 rounded-xl shadow-sm p-6 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
          />

          <select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
          >
            <option value="">Select a candidate</option>
            {candidates.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition"
          >
            Submit Vote
          </button>
        </form>
      )}
    </div>
  );
};

export default VoteForm;
