function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Browse Products",
      description:
        "Explore our curated catalog of premium products across every category.",
    },
    {
      number: 2,
      title: "Add to Cart",
      description:
        "Explore our curated catalog of premium products across every category.",
    },
    {
      number: 3,
      title: "Order & Receive",
      description:
        "Explore our curated catalog of premium products across every category.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-Instrument text-[#9c4f2c]">
          How it Works
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Simple steps from browsing to delivery
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-m" >
              <div className="w-12 h-12 rounded-full bg-[#9c4f2c] text-white flex items-center justify-center text-[16px]">
                {step.number}
              </div>
              <h3 className="mt-4 text-2xl font-medium font-Instrument text-gray-700">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-[15px] leading-4 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;