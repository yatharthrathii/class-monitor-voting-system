import { useVote } from "../context/VoteContextLocal";
import { Landmark } from "lucide-react";

const Header = () => {
  const { totalVotes } = useVote();

  return (
    <header className="bg-violet-50 py-6 px-4 shadow-md border-b border-violet-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Landmark className="text-violet-600 w-7 h-7" />
          <h1 className="text-2xl font-semibold text-slate-800">
            Class Monitor Voting
          </h1>
        </div>
        <p className="text-base font-medium text-slate-600">
          Total Votes: <span className="text-violet-700 font-bold">{totalVotes}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
