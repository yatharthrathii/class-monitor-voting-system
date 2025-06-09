import { createContext, useContext, useEffect, useState } from "react";

const VoteContext = createContext();

const API_URL = "https://your-backend.com/api/votes";

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({
    Yatharth: [],
    Tanmay: [],
    Himanshu: [],
  });

  const fetchVotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setVotes(data);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const addVote = async (voterName, candidate) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterName, candidate }),
      });
      if (res.ok) {
        fetchVotes();
      }
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  };

  const removeVote = async (voterName, candidate) => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterName, candidate }),
      });
      if (res.ok) {
        fetchVotes();
      }
    } catch (error) {
      console.error("Error removing vote:", error);
    }
  };

  const getVoteCount = (candidate) => votes[candidate]?.length || 0;

  const getVotersFor = (candidate) => votes[candidate] || [];

  const totalVotes = Object.keys(votes).reduce(
    (sum, candidate) => sum + getVoteCount(candidate),
    0
  );

  return (
    <VoteContext.Provider
      value={{
        candidates: Object.keys(votes),
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
