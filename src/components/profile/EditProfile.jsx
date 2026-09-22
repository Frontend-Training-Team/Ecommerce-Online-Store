import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, ArrowRight } from "lucide-react";
import { patchUpdateUser } from "../../api/users.api";

export default function EditProfile({ user, updateUser, setActiveTab }) {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      setLoading(true);
      const res = await patchUpdateUser(userId, {
        username: formData.username.trim(),
        phone: formData.phone.trim(),
        avatar: formData.avatar.trim(),
      });

      const serverUser = res.data?.user || {};

      updateUser({
        ...serverUser,
        username: formData.username.trim(),
        phone: formData.phone.trim(),
        avatar: formData.avatar.trim(),
      });

      toast.success("Profile updated successfully!");
      setActiveTab("overview");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials = formData.username
    ? formData.username.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="flex-1 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#E3DEDA] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
      >

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EDE8E3] pb-5">
          <div>
            <h2 className="font-Serif text-2xl font-medium text-[#211C18]">Edit profile</h2>
            <p className="text-sm text-[#6F655D] mt-1">
              Update your account details and profile information.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#8C837B] uppercase tracking-wider hidden sm:inline">
              Need something else?
            </span>
            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className="h-9 px-3.5 rounded-lg border border-[#DDD7D1] bg-[#FAF8F6] hover:bg-[#F2EBE5] 
              text-xs font-medium text-[#3A332D] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Addresses</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A4526]" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className="h-9 px-3.5 rounded-lg border border-[#DDD7D1] bg-[#FAF8F6] hover:bg-[#F2EBE5] 
              text-xs font-medium text-[#3A332D] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Password</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A4526]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5 pb-5 border-b border-[#EDE8E3]">
          <div className="w-20 h-20 rounded-full bg-[#F2EBE5] border border-[#E0D3C6] text-[#8A4526] font-Serif 
          text-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
            {formData.avatar ? (
              <img
                key={formData.avatar}
                src={formData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#211C18]">Profile avatar</h4>
            <p className="text-xs text-[#6F655D] mt-0.5">
              Paste an image link below to update your photo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Username *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
              focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Phone number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+20 100 123 4567"
              className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
              focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Email address</label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full h-12 px-4 rounded-xl border border-[#E3DEDA] bg-[#F2F0EE] text-sm text-[#6F655D] 
                cursor-not-allowed pr-20"
              />
              <span className="absolute right-3 text-[11px] px-2 py-0.5 rounded-full bg-[#E8F0EA] text-[#2F6B4F] 
              font-medium">
                Locked
              </span>
            </div>
            <span className="text-[11px] text-[#8C837B]">Email is tied to your login security.</span>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Avatar URL (Optional)</label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="https://images.unsplash.com/... or https://example.com/photo.jpg"
              className="w-full h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
              focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#EDE8E3]">
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-7 rounded-xl bg-[#8A4526] hover:bg-[#72361D] text-white text-sm font-medium 
            transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Save changes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className="h-11 px-6 rounded-xl border border-[#D6D0CA] bg-white text-sm font-medium text-[#3A332D] 
            hover:bg-[#FAF8F6] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}