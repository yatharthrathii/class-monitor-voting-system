import { useVote } from "../context/VoteContextApi";
import VoteCard from "./VoteCard";

const VoteSection = () => {
    const { candidates } = useVote();
    return (
        <div className="flex flex-wrap gap-4 justify-center mt-6 px-5">
            {candidates.map((name) => (
                <VoteCard key={name} candidate={name} />
            ))}
        </div>
    );
};

export default VoteSection; 