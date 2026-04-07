import { Button } from '../Button/Button';
import './Hero.css';

const heroImage = new URL('../../../Images_&_Videos/681a11d87a2f3c51ac0610d2_umbra-12-scaled.avif', import.meta.url).href;

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      {/* Background Image */}
      <img
        className="hero-bg"
        src={heroImage}
        alt="Hero Background"
        loading="eager"
      />

      {/* Dark Overlay for Readability */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-heading">
          Innovating the Future
          <span>with FalconTechLabs</span>
        </h1>
        <p className="hero-subheading">
          We craft immersive digital experiences that combine sophisticated design with
          state-of-the-art technology to help your brand stand out in the digital age.
        </p>
        <div className="hero-actions">
          <Button id="cta-get-started">
            LET'S TALK
          </Button>
        </div>
      </div>
    </section>
  );
};

