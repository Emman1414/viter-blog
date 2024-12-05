import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import News from "./News";
import Values from "./Values";
import WhatWeDo from "./WhatWeDo";
import Work from "./Work";

const Homepage = () => {
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
