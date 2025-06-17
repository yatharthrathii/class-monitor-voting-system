import { useVote } from "../context/VoteContextApi";
import { XCircle } from "lucide-react";

const VoteCard = ({ candidate }) => {
  const { getVoteCount, getVotersFor, removeVote } = useVote();
  const count = getVoteCount(candidate);
  const voters = getVotersFor(candidate);

  return (
    <div className="bg-white border border-violet-100 rounded-xl shadow-sm p-6 w-full sm:w-72 flex flex-col">
      <h2 className="text-2xl font-semibold text-violet-700">{candidate}</h2>
      <p className="text-lg mt-1 font-medium text-gray-700">
        Votes: <span className="text-amber-500">{count}</span>
      </p>

      <h3 className="mt-5 font-semibold text-gray-800 border-b border-violet-200 pb-1">
        Voters:
      </h3>
      <ul className="list-disc list-inside mt-2 max-h-32 overflow-y-auto text-gray-600 text-sm space-y-1">
        {voters.length === 0 ? (
          <li className="italic text-gray-400">No votes yet</li>
        ) : (
          voters.map((voter, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{voter.voterName}</span>
              <button
                onClick={() => removeVote(voter.id)}
                aria-label={`Remove vote by ${voter}`}
                className="text-red-500 hover:text-red-700 transition"
              >
                <XCircle size={18} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VoteCard;
