import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import ClientsList from "@/components/ClientsList";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ProjectsList />
      <ClientsList />
      <ContactForm />
      <Newsletter />
      <Footer />
      <div className="fixed bottom-4 right-4 z-50">
        <a href="/admin" className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg hover:bg-gray-700 transition duration-300">
          Admin Panel
        </a>
      </div>
    </main>
  );
}
