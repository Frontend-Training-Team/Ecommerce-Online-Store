import { Link } from "react-router-dom";

function CartBadge() {
  return (
    <Link
      to="/carts"
      className="relative rounded-lg border dark:border-line-strong px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-noir-750"
    >
      Cart
    </Link>
  );
}

export default CartBadge;