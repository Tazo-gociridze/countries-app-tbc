import { Suspense, lazy } from "react";
const LazyHomePageWrapper = lazy(() => import("./components/Wrapper"));

const Hero: React.FC = () => {
  return (
    <section className="hero__section">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHomePageWrapper />
      </Suspense>
    </section>
  );
};

export default Hero;
