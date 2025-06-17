import { createContext, useContext, useEffect, useState } from "react";

const VoteContext = createContext();

const API_URL = "https://crudcrud.com/api/6d82b1060b3e48bd907c3c03d9e38db4/votes";

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

      const groupedVotes = {
        Yatharth: [],
        Tanmay: [],
        Himanshu: [],
      };

      data.forEach(({ voterName, candidate, _id }) => {
        if (groupedVotes[candidate]) {
          groupedVotes[candidate].push({ voterName, id: _id });
        }
      });

      setVotes(groupedVotes);
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

  const removeVote = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
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
