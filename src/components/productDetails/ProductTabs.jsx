import { useState } from "react";
import { Star, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductTabs({
  description = "",
  reviews = [],
  averageRating = 0,
  numReviews = 0,
  activeTab = "details",
  setActiveTab,
  onAddReview,
  submittingReview = false,
  isLoggedIn = false,
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const cleanComment = comment.trim();
    if (!rating) return toast.error("Please select a star rating");
    if (!cleanComment) return toast.error("Please write a review comment");

    try {
      await onAddReview({ rating, comment: comment.trim() });
      setComment("");
      setRating(5);
    } catch(err) {
      console.error("Review submission error:", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recent";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div id="product-tabs" className="w-full flex flex-col md:flex-row gap-8 pt-8 border-t border-[#EDE8E3]">

      <div className="flex md:flex-col gap-2 w-full md:w-52 flex-shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`h-11 px-5 rounded-xl text-sm font-medium text-left transition-all cursor-pointer flex items-center 
            justify-between ${activeTab === "details"
            ? "bg-[#F5EDE6] text-[#7E4A2D] font-semibold shadow-xs"
            : "text-[#635B53] hover:bg-[#FAF8F5] hover:text-[#1E1915]"
            }`}
        >
          <span>Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`h-11 px-5 rounded-xl text-sm font-medium text-left transition-all cursor-pointer flex items-center 
            justify-between ${activeTab === "reviews"
            ? "bg-[#F5EDE6] text-[#7E4A2D] font-semibold shadow-xs"
            : "text-[#635B53] hover:bg-[#FAF8F5] hover:text-[#1E1915]"
            }`}
        >
          <span>Reviews</span>
          {numReviews > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "reviews"
                ? "bg-[#7E4A2D] text-white"
                : "bg-[#EFECE8] text-[#635B53]"
                }`}
            >
              {numReviews}
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 w-full min-w-0">

        {activeTab === "details" && (
          <div className="flex flex-col gap-4">
            <h2 className="font-Serif text-xl sm:text-2xl font-medium text-[#1E1915]">
              Product Description
            </h2>
            <div className="text-sm sm:text-[15px] text-[#5C544E] leading-relaxed whitespace-pre-line">
              {description || "No detailed description provided for this product."}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-Serif text-xl sm:text-2xl font-medium text-[#1E1915] mb-3">
                Reviews
              </h2>

              <div className="flex items-center gap-3">
                <span className="font-Serif text-3xl sm:text-4xl text-[#1E1915] font-normal">
                  {Number(averageRating || 0).toFixed(1)}
                </span>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(averageRating || 0)
                        ? "fill-[#F5A623] text-[#F5A623]"
                        : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>

                <span className="text-xs sm:text-sm text-[#706861]">
                  ({numReviews || 0} Reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#EDE8E3] border-t border-[#EDE8E3]">
              {reviews.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center gap-2 text-[#706861]">
                  <MessageSquare className="w-8 h-8 text-[#C7BEB4] stroke-1" />
                  <p className="text-sm font-medium">No reviews yet.</p>
                  <p className="text-xs">Be the first to share your experience with this product!</p>
                </div>
              ) : (
                reviews.map((rev, idx) => {
                  const author = rev.username || rev.user?.username || "Verified Customer";
                  const initial = author.charAt(0).toUpperCase();

                  return (
                    <div key={rev._id || idx} className="py-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#7E4A2D] text-white flex items-center justify-center 
                          text-xs font-semibold">
                            {initial}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-[#1E1915]">{author}</h4>
                            <span className="text-xs text-[#8F877F]">
                              {formatDate(rev.createdAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${star <= (rev.rating || 5)
                                ? "fill-[#F5A623] text-[#F5A623]"
                                : "fill-gray-200 text-gray-200"
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-[#4A423C] leading-relaxed pl-11">
                        {rev.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-6 border-t border-[#EDE8E3] flex flex-col gap-4">
              <div>
                <h3 className="font-Serif text-xl font-medium text-[#1E1915]">
                  Write a Review
                </h3>
                <p className="text-xs sm:text-sm text-[#706861] mt-1">
                  What is it like to Product?
                </p>
              </div>

              {isLoggedIn ? (
                <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">

                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 text-[#F5A623] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${isFilled
                              ? "fill-[#F5A623] text-[#F5A623]"
                              : "text-[#D6CFC7]"
                              }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs text-[#706861] ml-2">
                      {rating} of 5 stars
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Share your thoughts...."
                    className="w-full p-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F5] focus:bg-white 
                    focus:border-[#7E4A2D] text-sm text-[#1E1915] focus:outline-none transition-all resize-y"
                  />

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="self-start h-11 px-7 rounded-xl bg-[#7E4A2D] hover:bg-[#683C23] text-white 
                    text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submittingReview ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E3DDD5] flex flex-col sm:flex-row items-center 
                justify-between gap-3">
                  <p className="text-xs sm:text-sm text-[#5C544E]">
                    Please log in to write a review and rate this product.
                  </p>
                  <Link
                    to="/login"
                    className="h-9 px-5 rounded-lg bg-[#7E4A2D] hover:bg-[#683C23] text-white text-xs font-medium 
                    flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
