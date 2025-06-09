import { createContext, useContext, useEffect, useState } from "react";

const VoteContext = createContext();

const VOTE_STORAGE_KEY = "class_monitor_votes";

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState(() => {
    const savedVotes = localStorage.getItem(VOTE_STORAGE_KEY);
    return savedVotes
      ? JSON.parse(savedVotes)
      : {
          Yatharth: [],
          Tanmay: [],
          Himanshu: [],
        };
  });

  useEffect(() => {
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  const candidates = Object.keys(votes);

  const addVote = (voterName, candidate) => {
    if (!votes[candidate].includes(voterName)) {
      setVotes((prev) => ({
        ...prev,
        [candidate]: [...prev[candidate], voterName],
      }));
    }
  };

  const removeVote = (voterName, candidate) => {
    setVotes((prev) => ({
      ...prev,
      [candidate]: prev[candidate].filter((voter) => voter !== voterName),
    }));
  };

  const getVoteCount = (candidate) => votes[candidate]?.length || 0;

  const getVotersFor = (candidate) => votes[candidate] || [];

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + getVoteCount(candidate),
    0
  );

  return (
    <VoteContext.Provider
      value={{
        candidates,
        addVote,
        removeVote,
        getVoteCount,
        getVotersFor,
        totalVotes,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => useContext(VoteContext);
