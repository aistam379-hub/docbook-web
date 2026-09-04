import Nav from './components/Nav'
import Hero from './components/Hero'
import PatientJourney from './components/PatientJourney'
import BookingSection from './components/BookingSection'
import NurseSection from './components/NurseSection'
import DoctorSection from './components/DoctorSection'
import PrivacySection from './components/PrivacySection'
import SpecialtiesSection from './components/SpecialtiesSection'
import StartSection from './components/StartSection'
import SummarySection from './components/SummarySection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PatientJourney />
        <BookingSection />
        <NurseSection />
        <DoctorSection />
        <PrivacySection />
        <SpecialtiesSection />
        <StartSection />
        <SummarySection />
      </main>
      <Footer />
    </>
  )
}

export default App
