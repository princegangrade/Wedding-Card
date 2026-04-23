// Preloader removed to show main content immediately
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import EventsSection from './components/EventsSection';
import OurStorySection from './components/OurStorySection';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import TraditionalBackground from './components/TraditionalBackground';

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-800 relative">
      <TraditionalBackground />
      <Navbar />
      <FloatingWidgets />
      
      <main>
        <HeroSection />
        <InvitationSection />
        <OurStorySection />
        <EventsSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
