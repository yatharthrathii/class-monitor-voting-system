import Header from "./components/Header";
import VoteForm from "./components/VoteForm";
import VoteSection from "./components/VoteSection";
import { VoteProvider } from "./context/VoteContextApi";

const App = () => {
  return (
    <VoteProvider>
      <Header />
      <VoteForm />
      <VoteSection />
    </VoteProvider>
  );
};

export default App;
