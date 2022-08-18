import React from "react";
import ContentLoader from "react-content-loader";

interface IProps {}

const Skeleton: React.FC<IProps> = props => {
  return (
    <ContentLoader
      className="game-block"
      speed={2}
      width={270}
      height={466}
      viewBox="0 0 270 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="66" y="278" rx="11" ry="11" width="150" height="27" />
      <circle cx="190" cy="21" r="2" />
      <rect x="-2" y="0" rx="14" ry="14" width="270" height="350" />
      <rect x="112" y="418" rx="27" ry="27" width="152" height="47" />
      <rect x="24" y="354" rx="11" ry="11" width="217" height="30" />
      <rect x="163" y="374" rx="0" ry="0" width="0" height="4" />
      <rect x="2" y="392" rx="11" ry="11" width="259" height="18" />
      <rect x="10" y="430" rx="12" ry="12" width="76" height="27" />
    </ContentLoader>
  );
};

export default Skeleton;
