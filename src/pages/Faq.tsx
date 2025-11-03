export default function Faq() {
  const faqs = [
    {
      question: "How does GoRide ensure passenger safety?",
      answer:
        "GoRide prioritizes safety through verified drivers, real-time GPS tracking, and 24/7 customer support for every trip.",
    },
    {
      question: "Can I book a ride in advance?",
      answer:
        "Yes! You can schedule a ride up to 7 days in advance using our easy booking system in the GoRide app.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, digital wallets, and in select locations, cash payments.",
    },
    {
      question: "How do I become a GoRide driver?",
      answer:
        "Simply sign up on our website or app, upload your documents, and complete a short verification process.",
    },
    {
      question: "Is GoRide available in my city?",
      answer:
        "GoRide operates in major cities across the USA — check our app for live availability in your area.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Find quick answers to common questions about GoRide.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <svg
                className="w-5 h-5 text-primary transition-transform duration-300 group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p className="pt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
