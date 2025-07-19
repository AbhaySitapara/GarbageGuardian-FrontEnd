import React, { useState } from 'react';
import './FAQ.css'; // Add this for custom styling
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const faqs = [
    {
      question: "What is the primary goal of Garbage Guardian?",
      answer: "The main goal of Garbage Guardian is to enhance urban waste management by enabling citizens to report waste issues in real-time. This platform empowers residents to contribute directly to a cleaner city by making it easier for municipal authorities to identify, prioritize, and address waste problems efficiently.",
    },
    {
      question: "How do users report waste issues on the platform?",
      answer: "Users can report waste by uploading images, tagging the location, and categorizing the type of waste. This information is then sent to municipal authorities, allowing them to see exactly where and what kind of waste needs attention, making it easier to plan collection and cleanup efforts.",
    },
    {
      question: "What types of waste can be reported through Garbage Guardian?",
      answer: "Garbage Guardian allows users to categorize waste into types such as general trash, recyclable materials, hazardous waste, and organic waste. This helps authorities prioritize resources and determine the appropriate disposal methods for each type of waste.",
    },
    {
      question: "How does Garbage Guardian handle spam reports or inconsistent data?",
      answer: "The platform could use AI or manual moderation to verify reports and filter out spam entries. Future versions may integrate automated checks to validate data quality, ensuring that only accurate and useful reports reach municipal authorities for action.",
    },
    {
      question: "Who is responsible for collecting the waste reported by users?",
      answer: "Garbage Guardian serves as a bridge between citizens and municipal authorities. Once a report is submitted, the relevant municipal department or waste collection agency is notified, allowing them to schedule waste collection based on priority and location.",
    },
    {
      question: "Can users track the status of their waste reports?",
      answer: "Yes, users receive updates on the status of their reports, allowing them to see whether a report has been completed or not. This feature fosters transparency and encourages continued user engagement with the platform.",
    },
    {
      question: "How does Garbage Guardian contribute to long-term waste reduction?",
      answer: "By enabling citizens to report waste in real-time, Garbage Guardian promotes awareness of urban waste issues and encourages cleaner habits. Over time, the platform could encourage responsible waste disposal practices, contributing to overall waste reduction and a cleaner urban environment.",
    },
    {
      question: "What are the potential challenges Garbage Guardian might face?",
      answer: "Key challenges include managing spam or duplicate reports, ensuring data accuracy, and maintaining regular engagement from both users and municipal authorities. Addressing these challenges is essential for the platform’s long-term effectiveness and scalability.",
    },
    {
      question: "Is Garbage Guardian available for multiple cities or regions?",
      answer: "Currently, the platform is designed for a particular region as a pilot project. However, with the right infrastructure and partnerships, it has the potential to scale and adapt to various urban settings, potentially operating in multiple cities in the future.",
    },
    {
      question: "How does Garbage Guardian plan to evolve in the future?",
      answer: "In the future, Garbage Guardian could incorporate features like predictive analytics for waste hotspots, AI validation of reports, and integration with smart city technologies. Additionally, partnerships with environmental organizations could extend the platform's impact, allowing it to become a key part of sustainable urban waste management.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
