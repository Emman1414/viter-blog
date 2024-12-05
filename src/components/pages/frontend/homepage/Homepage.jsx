import useQueryData from "@/components/custom-hook/useQueryData";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import News from "./News";
import Values from "./Values";
import WhatWeDo from "./WhatWeDo";
import Work from "./Work";

const Homepage = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v2/blog`, // endpoint
    "get", // method
    "blog"
  );

  return (
    <>
      <div className="p-2">
        <div className="p-4 border border-black m-4">
          <Header />
          <Banner />
          <WhatWeDo />
          <Work />
          <Values />
          <News title="Latest News" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Homepage;
