import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Check,
  Mail,
  Phone,
  MapPin,
  Lock,
  LogOut,
  Plus,
  Loader2,
  Trash2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { patchUpdateUser } from "../api/users.api";
import { postForgotPasswordSendOtp, postForgotPasswordVerifyOtp } from "../api/auth.api";

export default function ProfilePage() {
  const { user, loading: authLoading, updateUser, logout } = useAuth();

  // 1. حالات تعديل البيانات الأساسية (Username, Phone, Avatar)
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", phone: "", avatar: "" });
  const [updating, setUpdating] = useState(false);

  // 2. حالات العناوين (Addresses)
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: ""
  });
  const [addingAddress, setAddingAddress] = useState(false);

  // 3. حالات تغيير كلمة المرور (Change Password)
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // مزامنة البيانات عند وصول المستخدم من الـ Context
  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
      setAddresses(user.addresses || []);
    }
  }, [user]);

  // حفظ تعديل البيانات الأساسية
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      setUpdating(true);
      const res = await patchUpdateUser(userId, {
        username: editForm.username.trim(),
        phone: editForm.phone.trim(),
        avatar: editForm.avatar.trim(),
      });

      const updatedUser = res.data?.user || res.data;
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // إضافة عنوان جديد (Add Address)
  const handleAddAddress = async () => {
    if (!addressForm.country.trim() || !addressForm.city.trim() || !addressForm.street.trim()) {
      toast.error("Please fill country, city and street");
      return;
    }

    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      setAddingAddress(true);

      // تجهيز كائن العنوان الجديد
      const newAddressItem = {
        country: addressForm.country.trim(),
        city: addressForm.city.trim(),
        street: addressForm.street.trim(),
        building: addressForm.building.trim(),
        postalCode: addressForm.postalCode.trim(),
        defaultAddress: addresses.length === 0, // لو أول عنوان يخليه افتراضي
      };

      const newAddresses = [...addresses, newAddressItem];

      // إرسال المصفوفة المحدثة للسيرفر
      const res = await patchUpdateUser(userId, { addresses: newAddresses });
      const updatedUser = res.data?.user || res.data?.data || { ...user, addresses: newAddresses };

      updateUser(updatedUser);
      setAddresses(newAddresses);
      setAddressForm({ country: "", city: "", street: "", building: "", postalCode: "" });
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setAddingAddress(false);
    }
  };

  // حذف عنوان (Remove Address)
  const handleRemoveAddress = async (indexToRemove) => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      const newAddresses = addresses.filter((_, idx) => idx !== indexToRemove);
      const res = await patchUpdateUser(userId, { addresses: newAddresses });
      const updatedUser = res.data?.user || res.data?.data || { ...user, addresses: newAddresses };

      updateUser(updatedUser);
      setAddresses(newAddresses);
      toast.success("Address removed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove address");
    }
  };

  // إرسال كود OTP لتغيير كلمة المرور
  const handleSendOtp = async () => {
    if (!user?.email) return;
    try {
      setOtpSending(true);
      await postForgotPasswordSendOtp({ email: user.email });
      setOtpSent(true);
      toast.success("OTP sent to your email successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpSending(false);
    }
  };

  // تأكيد الـ OTP وتغيير كلمة المرور
  const handleVerifyOtpAndChangePass = async (e) => {
    e.preventDefault();
    if (!otpCode || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setVerifyingOtp(true);
      await postForgotPasswordVerifyOtp({
        email: user.email,
        otp: otpCode.trim(),
        newPassword: newPassword,
      });
      toast.success("Password changed successfully! Please log in again.");
      setOtpSent(false);
      setOtpCode("");
      setNewPassword("");
      logout();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setVerifyingOtp(false);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="h-8 bg-slate-800 rounded w-1/4"></div>
        <div className="h-56 bg-slate-900 border border-slate-800 rounded-2xl"></div>
        <div className="h-64 bg-slate-900 border border-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">

      {/* عنوان الصفحة */}
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
        My Profile
      </h1>

      {/* 1. البطاقة الأولى: بيانات المستخدم */}
      <div className="bg-[#101726] border border-slate-800/80 rounded-2xl p-6 md:p-8 relative shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 flex-shrink-0">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&auto=format&fit=crop&q=80"}
              alt={user?.username || "Avatar"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.username || "Admin");
              }}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                {user?.username || "ADMIN"}
              </h2>
              <span className="w-4 h-4 rounded bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
            <p className="text-xs text-slate-400">{user?.email || "admin@koda.com"}</p>
            <p className="text-xs font-semibold text-blue-500 capitalize">{user?.role || "Admin"}</p>
          </div>
        </div>

        {/* تفاصيل الاتصال */}
        <div className="mt-6 space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-slate-500" />
            <span>{user?.email || "admin@koda.com"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{user?.phone || "01000000000"}</span>
          </div>
        </div>

        {/* زر تعديل الملف الشخصي */}
        <div className="mt-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition cursor-pointer"
          >
            {isEditing ? "Close" : "Edit Profile"}
          </button>
        </div>

        {/* نموذج التعديل */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Avatar URL</label>
                <input
                  type="url"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                  className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                {updating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. البطاقة الثانية: العناوين (Addresses Card) */}
      <div className="bg-[#101726] border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Addresses</h3>
        </div>

        {/* عرض قائمة العناوين المحفوظة إن وجدت */}
        {addresses.length > 0 ? (
          <div className="space-y-3 mb-4">
            {addresses.map((addr, idx) => (
              <div
                key={`${addr.country}-${idx}`}
                className="p-3.5 rounded-xl border border-slate-800 bg-[#0a0f1d] flex items-start justify-between gap-3"
              >
                <div className="text-xs text-slate-300 space-y-0.5">
                  <p className="font-semibold text-white text-sm">
                    {addr.city}, {addr.country}
                  </p>
                  <p className="text-slate-400">
                    {addr.street}{addr.building ? `, Building ${addr.building}` : ""}
                  </p>
                  {addr.postalCode && (
                    <p className="text-slate-400">Postal Code: {addr.postalCode}</p>
                  )}
                  {addr.defaultAddress && (
                    <span className="inline-block text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 mt-1">
                      Default address
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAddress(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                  title="Remove address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No addresses yet.</p>
        )}

        {/* شبكة مدخلات العنوان مربوطة بالـ State بالكامل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Country"
            value={addressForm.country}
            onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
            className="w-full bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="City"
            value={addressForm.city}
            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
            className="w-full bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Street"
            value={addressForm.street}
            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
            className="w-full bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Building"
            value={addressForm.building}
            onChange={(e) => setAddressForm({ ...addressForm, building: e.target.value })}
            className="w-full bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Postal code"
            value={addressForm.postalCode}
            onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
            className="w-full sm:col-span-2 bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* زر حفظ العنوان */}
        <div>
          <button
            type="button"
            onClick={handleAddAddress}
            disabled={addingAddress}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            {addingAddress ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Add Address
          </button>
        </div>
      </div>

      {/* 3. البطاقة الثالثة: تغيير كلمة المرور */}
      <div className="bg-[#101726] border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-5 shadow-lg">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Change Password</h3>
        </div>

        <p className="text-xs text-slate-400">
          We&apos;ll send an OTP to your email to verify your identity.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={user?.email || "admin@koda.com"}
            disabled
            className="w-full bg-[#0a0f1d] border border-slate-800/90 rounded-xl px-4 py-3 text-xs text-slate-400 cursor-not-allowed"
          />

          {!otpSent ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSending}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-2 cursor-pointer"
              >
                {otpSending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Send OTP
              </button>
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtpAndChangePass} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={verifyingOtp}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-2 cursor-pointer"
                >
                  {verifyingOtp && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Verify & Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 4. زر تسجيل الخروج (Logout) */}
      <div className="pt-2">
        <button
          onClick={logout}
          className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

    </div>
  );
}