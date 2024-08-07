import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="2" y="427" rx="5" ry="5" width="90" height="27" />
    <rect x="125" y="418" rx="30" ry="30" width="150" height="45" />
    <rect x="0" y="271" rx="5" ry="5" width="280" height="25" />
  </ContentLoader>
);

export default PizzaSkeleton;
