import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
// import "./contact-popup.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowPopup(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-[#FFCF71]/20 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Let's discuss how we can work together on your next project
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl text-[#7B542F] mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-8">
                  Feel free to reach out through any of these channels. I'm
                  always open to discussing new projects and opportunities.
                </p>
              </div>

              <div className="space-y-6">
                {/* PHONE */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-[#FF9D00] p-3 rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#7B542F] mb-1">Phone</h4>
                    <a
                      href="tel:9368860517"
                      className="text-gray-700 hover:text-[#FF9D00] transition-colors"
                    >
                      +91 9368860517
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-[#FF9D00] p-3 rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#7B542F] mb-1">Email</h4>
                    <a
                      href="mailto:nitinkumarvasdhani786@gmail.com"
                      className="text-gray-700 hover:text-[#FF9D00] transition-colors break-all"
                    >
                      nitinkumarvasdhani786@gmail.com
                    </a>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-[#FF9D00] p-3 rounded-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#7B542F] mb-1">Location</h4>
                    <p className="text-gray-700">
                      Agra, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#7B542F] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF9D00] focus:outline-none focus:ring-2 focus:ring-[#FF9D00]/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#7B542F] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF9D00] focus:outline-none focus:ring-2 focus:ring-[#FF9D00]/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#7B542F] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF9D00] focus:outline-none focus:ring-2 focus:ring-[#FF9D00]/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF9D00] hover:bg-[#FF9D00]/90 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-md animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500 text-white flex items-center justify-center rounded-full text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-semibold text-[#7B542F] mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for your message. I will get back to you soon.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#FF9D00] hover:bg-[#FF9D00]/90 text-white px-6 py-3 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
