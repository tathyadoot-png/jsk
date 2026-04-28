import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/layouts/MainLayout";
import HeroSection from "./sections/home/HeroSection";
import AboutSection from "./sections/about/AboutSection";
import JourneySection from "./sections/journey/JourneySection";
import ContributionsSection from "./sections/contributions/ContributionsSection";
import AchievementsSection from "./sections/achievements/AchievementsSection";
import LeadershipSection from "./sections/leadership/LeadershipSection";
import GallerySection from "./sections/gallery/GallerySection";
import ContactSection from "./sections/contact/ContactSection";
import AudioVideoSection from "./sections/AudioVideo/AudioVideoSection";
import GovernanceSection from "./sections/Governance/GovernanceSection";
import JalJeevanSection from "./sections/jalJeevan/JalJeevanSection";
import ArticleSection from "./sections/article/ArticleSection";
import ActivitiesSection from "./sections/activities/ActivitiesSection";
// import HeroSection from "./sections/hero/HeroSection";

const HomePage = () => {
  const { lang } = useOutletContext<{ lang: Lang }>();

  return (
    <>
      <section id="home">
        <HeroSection lang={lang} />
      </section>
<section id="about">
  <AboutSection lang={lang} />
</section>
<section id="activities">
  <ActivitiesSection lang={lang} />
</section>
<section id="journey">
  <JourneySection lang={lang} />
</section>
<section id="governance">
  <GovernanceSection lang={lang} />
</section>
<section id="jalJeevan">
  <JalJeevanSection lang={lang} />
</section>
<section id="contributions">
  {/* <ContributionsSection lang={lang} /> */}
</section>
<section id="achievements">
  {/* <AchievementsSection lang={lang} /> */}
</section>
<section id="leadership">
  {/* <LeadershipSection lang={lang} /> */}
</section>
<section id="vichar">
  <ArticleSection lang={lang} />
</section>

<section id="media">
  <GallerySection  />
</section>
<section id="media2">
  {/* <AudioVideoSection lang={lang} /> */}
</section>
<section id="contact">
  <ContactSection  />
</section>
    </>
  );
};

export default HomePage;
