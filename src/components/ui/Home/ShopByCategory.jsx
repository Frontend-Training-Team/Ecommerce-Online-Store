import Ch2 from "../../../assets/images/categories/productImg.jpg";

function ShopByCategory() {
  const categories = [
    {
      id: 1,
      name: "Chair",
      image: Ch2,
    },
    {
      id: 2,
      name: "Desk",
      image: Ch2,
    },
    {
      id: 3,
      name: "Chair",
      image: Ch2,
    },
    {
      id: 4,
      name: "Lamp",
      image: Ch2,
    },
  ];

  return (
    <section className="bg-white py-10 ">
      <div className="mx-auto max-w-fit">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-Instrument text-[#9c4f2c]">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500">
            Browse our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {categories.map((category) => (
            <div key={category.id} className="w-87.5 transition-transform duration-300 hover:scale-105 overflow-hidden">
              <div 
              className="flex h-87.5 items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat bg-red-500" 
              style={{ backgroundImage: `url(${Ch2})` }}>
                {/* <img src={category.image} alt={category.name} className="object- transition-transform duration-300 hover:scale-105"/> */}
              </div>

              <p className="mt-4 text-[21px] font-serif text-gray-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ShopByCategory;