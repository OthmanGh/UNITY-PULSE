import { Link, Element } from 'react-scroll';
import Features from './components/Features/Features';
import { Aboutus, Hero, Navbar } from './components/index';
import { ArrowScrollTop } from '../../utils/icons';
import ContactForm from './components/Getintouch';
import Footer from './components/Footer';

function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col ">
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="features">
          <Features />
        </Element>
        <Element name="aboutus">
          <Aboutus />
        </Element>
        <Element name="getintouch">
          <ContactForm />
        </Element>
        <Element name="footer">
          <Footer />
        </Element>
      </main>

      <div className="fixed bottom-4 right-4 z-10">
        <Link activeClass="active" to="hero" spy={true} smooth={true} offset={-70} duration={500}>
          <button className="rounde-lg font-bold text-2xl sm:text-4xl">
            <ArrowScrollTop className="border-none text-dark hover:text-primary transition-all duration-500 rounded-full" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
