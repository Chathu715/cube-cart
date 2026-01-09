"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoMail, IoLogoGithub, IoSend, IoPerson, IoText, IoCheckmarkCircle, IoLogoLinkedin, IoGlobe } from "react-icons/io5";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <IoMail className="text-6xl text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="glass-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <IoCheckmarkCircle className="text-6xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <IoPerson className="inline mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <IoMail className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <IoText className="inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                >
                  <IoSend />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Links */}
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>

              <div className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <IoGlobe className="text-3xl text-yellow-400" />
                    <h3 className="text-lg font-bold">Portfolio</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Check out my portfolio to see more projects and skills.
                  </p>
                  <a
                    href="https://chathura-dinuwan.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 glass rounded-full hover:bg-white/10 transition font-semibold"
                  >
                    Visit Portfolio →
                  </a>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <IoLogoLinkedin className="text-3xl text-blue-400" />
                    <h3 className="text-lg font-bold">LinkedIn</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Connect with me on LinkedIn for professional networking.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/chathura-dinuwan-1b5652256/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 glass rounded-full hover:bg-white/10 transition font-semibold"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <IoLogoGithub className="text-3xl text-white" />
                    <h3 className="text-lg font-bold">GitHub Repository</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    View the source code, report issues, or contribute to the project.
                  </p>
                  <a
                    href="https://github.com/Chathu715/cube-cart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 glass rounded-full hover:bg-white/10 transition font-semibold"
                  >
                    View Repository →
                  </a>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <IoPerson className="text-3xl text-yellow-400" />
                    <h3 className="text-lg font-bold">GitHub Profile</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Explore my other projects and open source contributions.
                  </p>
                  <a
                    href="https://github.com/Chathu715"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 glass rounded-full hover:bg-white/10 transition font-semibold"
                  >
                    Visit GitHub Profile →
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Quick Info</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="font-semibold text-yellow-400">Developer:</span> Chathura Dinuwan
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">License:</span> MIT License
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">Technology:</span> Next.js, TypeScript, MongoDB
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">Status:</span> Active Development
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Common Questions</h2>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-yellow-400">Is CubeCart open source?</h3>
                <p className="text-gray-300">
                  Yes! CubeCart is released under the MIT License. You can view, modify, and use the code
                  for your own projects. Check out the GitHub repository for the source code.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-yellow-400">Can I contribute to the project?</h3>
                <p className="text-gray-300">
                  Absolutely! Contributions are welcome. Fork the repository, make your changes, and submit
                  a pull request. You can also report bugs or suggest features through GitHub Issues.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-yellow-400">How do I deploy CubeCart?</h3>
                <p className="text-gray-300">
                  CubeCart is built with Next.js and can be easily deployed to Vercel, Netlify, or any platform
                  that supports Node.js. Check the README for detailed deployment instructions.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-yellow-400">Can I use this for my business?</h3>
                <p className="text-gray-300">
                  Yes! The MIT License allows commercial use. Feel free to adapt CubeCart for your e-commerce
                  needs. We'd love to hear about your implementation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
