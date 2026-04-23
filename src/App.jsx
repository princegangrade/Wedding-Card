// Preloader removed to show main content immediately
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Navbar />
      <FloatingWidgets />
      
      <main>
        <HeroSection />
        <InvitationSection />
        <EventsSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
