import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";

const Home = () => {
  // Example: Set userId to a fixed value, or fetch it from context, state, etc.
  const userId = 1; // Replace with actual logic to get userId

  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts userId={userId} />
    </div>
  );
};

export default Home;
