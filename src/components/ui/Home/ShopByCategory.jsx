import chair from "../../../assets/images/categories/chair.jpg";
import lamb from "../../../assets/images/categories/lamb.jpg";
import Ch2 from "../../../assets/images/categories/ch2.jpg";
import book from "../../../assets/images/categories/book.jpg";

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
      image: book,
    },
    {
      id: 3,
      name: "Chair",
      image: chair,
    },
    {
      id: 4,
      name: "Lamp",
      image: lamb,
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-serif text-[#9c4f2c]">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500">
            Browse our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id} className="group">
              <div className="flex h-60 items-center justify-center overflow-hidden rounded-xl bg-[#F5F5F5]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    h-full
                    w-full
                    object-contain
                   
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              <p className="mt-4 text-center text-[21px] font-serif text-gray-700">
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