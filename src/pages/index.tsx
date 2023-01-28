import { type NextPage } from "next";
import Layout from "@components/layout";
import Compose from "@components/compose";

const Home: NextPage = () => {
  return (
    <Layout>
      <Compose />
    </Layout>
  );
};

export default Home;
