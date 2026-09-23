import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Edit2, Trash2, Home, Briefcase } from "lucide-react";
import { patchUpdateUser } from "../../../api/users.api";

export default function AddressBook({ user, updateUser }) {
    const addresses = user?.addresses || [];
    const [editingIndex, setEditingIndex] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [defaultingIndex, setDefaultingIndex] = useState(null); 
    const [removingIndex, setRemovingIndex] = useState(null);

    const initialForm = {
        label: "Home",
        country: "Egypt",
        city: "",
        street: "",
        building: "",
        postalCode: "",
        defaultAddress: false,
    };

    const [form, setForm] = useState(initialForm);

    const handleStartEdit = (addr, idx) => {
        setEditingIndex(idx);
        setForm({
            label: addr.label || "Home",
            country: addr.country || "Egypt",
            city: addr.city || "",
            street: addr.street || "",
            building: addr.building || "",
            postalCode: addr.postalCode || "",
            defaultAddress: Boolean(addr.defaultAddress),
        });
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setForm(initialForm);
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        if (!form.country.trim() || !form.city.trim() || !form.street.trim()) {
            return toast.error("Please fill in country, city, and street");
        }

        const userId = user?._id || user?.id;
        if (!userId) return;

        try {
            setLoading(true);
            let updatedList = [...addresses];

            const addressData = {
                ...form,
                defaultAddress: form.defaultAddress || updatedList.length === 0,
            };

            if (addressData.defaultAddress) {
                updatedList = updatedList.map((a) => ({ ...a, defaultAddress: false }));
            }

            if (editingIndex !== null) {
                updatedList[editingIndex] = addressData;
            } else {
                updatedList.push(addressData);
            }

            localStorage.setItem(`lamsa_addresses_${userId}`, JSON.stringify(updatedList));

            const res = await patchUpdateUser(userId, { addresses: updatedList });
            const updatedUser = res.data?.user || {};
            updateUser({
                ...updatedUser,
                addresses: updatedList,
            });

            toast.success(editingIndex !== null ? "Address updated!" : "Address added successfully!");
            handleCancel();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (idx) => {
        const userId = user?._id || user?.id;
        if (!userId) return;

        try {
            setRemovingIndex(idx);
            const updatedList = addresses.filter((_, i) => i !== idx);
            localStorage.setItem(`lamsa_addresses_${userId}`, JSON.stringify(updatedList));
            const res = await patchUpdateUser(userId, { addresses: updatedList });
            const updatedUser = res.data?.user || {};
            updateUser({
                ...updatedUser,
                addresses: updatedList,
            });
            toast.success("Address removed!");
            if (editingIndex === idx) handleCancel();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to remove address");
        } finally {
            setRemovingIndex(null);
        }
    };

    const handleMakeDefault = async (idx) => {
        const userId = user?._id || user?.id;
        if (!userId) return;

        try {
            setDefaultingIndex(idx);
            const updatedList = addresses.map((addr, i) => ({
                ...addr,
                defaultAddress: i === idx,
            }));
            localStorage.setItem(`lamsa_addresses_${userId}`, JSON.stringify(updatedList));
            const res = await patchUpdateUser(userId, { addresses: updatedList });
            const updatedUser = res.data?.user || {};
            updateUser({
                ...updatedUser,
                addresses: updatedList,
            });
            toast.success("Default address updated!");
        } catch {
            toast.error("Failed to update default address");
        } finally {
            setDefaultingIndex(null);
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col gap-7">

            <form
                onSubmit={handleSaveAddress}
                className="w-full bg-white border border-[#E3DEDA] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
            >
                <div className="border-b border-[#EDE8E3] pb-4">
                    <h2 className="font-Serif text-2xl font-medium text-[#211C18]">
                        {editingIndex !== null ? "Edit address" : "Add a new address"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6F655D] mt-1">
                        Fields marked with * are required for delivery.
                    </p>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Label this address</label>
                    <div className="flex gap-2">
                        {["Home", "Office", "Other"].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() => setForm({ ...form, label })}
                                className={`h-9 px-4 rounded-full text-xs font-medium border transition-colors cursor-pointer 
                                    ${form.label === label
                                        ? "bg-[#F7EFE9] border-[#8A4526] text-[#8A4526]"
                                        : "bg-white border-[#D6D0CA] text-[#3A332D] hover:bg-[#FAF8F6]"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Country *</label>
                        <input
                            type="text"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            required
                            placeholder="e.g. Egypt"
                            className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                            focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">City *</label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            required
                            placeholder="e.g. Cairo"
                            className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                            focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Street address *</label>
                        <input
                            type="text"
                            value={form.street}
                            onChange={(e) => setForm({ ...form, street: e.target.value })}
                            required
                            placeholder="18 El Nasr Street"
                            className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                            focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Building / Apt</label>
                        <input
                            type="text"
                            value={form.building}
                            onChange={(e) => setForm({ ...form, building: e.target.value })}
                            placeholder="Bldg 7, Apt 3"
                            className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                            focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Postal code</label>
                        <input
                            type="text"
                            value={form.postalCode}
                            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                            placeholder="11765"
                            className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                            focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4A423C] cursor-pointer pt-1">
                    <input
                        type="checkbox"
                        checked={form.defaultAddress}
                        onChange={(e) => setForm({ ...form, defaultAddress: e.target.checked })}
                        className="w-4 h-4 accent-[#8A4526] rounded cursor-pointer"
                    />
                    <span>Set as my default delivery address</span>
                </label>

                <div className="flex items-center gap-3 pt-3 border-t border-[#EDE8E3]">
                    <button
                        type="submit"
                        disabled={loading}
                        className="h-11 px-7 rounded-xl bg-[#8A4526] hover:bg-[#72361D] text-white text-sm 
                        font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        <span>{editingIndex !== null ? "Update address" : "Save address"}</span>
                    </button>

                    {editingIndex !== null && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="h-11 px-6 rounded-xl border border-[#D6D0CA] bg-white text-sm font-medium 
                            text-[#3A332D] hover:bg-[#FAF8F6] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <section className="w-full bg-white border border-[#E3DEDA] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm">
                <div className="flex items-baseline justify-between border-b border-[#EDE8E3] pb-4">
                    <div>
                        <h3 className="font-Serif text-2xl font-medium text-[#211C18]">Saved addresses</h3>
                        <p className="text-xs sm:text-sm text-[#6F655D] mt-0.5">
                            Manage your saved delivery locations.
                        </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF8F6] border border-[#E3DEDA] rounded-full text-[#6F655D]">
                        {addresses.length} total
                    </span>
                </div>

                {addresses.length === 0 ? (
                    <div className="py-10 px-4 border border-dashed border-[#D6D0CA] rounded-xl text-center 
                    text-sm text-[#6F655D] bg-[#FAF8F6]">
                        No addresses saved yet. Use the form below to add your first delivery address.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr, idx) => (
                            <div
                                key={idx}
                                className={`p-5 rounded-xl border flex flex-col justify-between gap-3 transition-all 
                                    ${addr.defaultAddress
                                        ? "bg-[#FAF6F2] border-[#E0D3C6] shadow-sm"
                                        : "bg-[#FAF8F6] border-[#E3DEDA] hover:border-[#D6D0CA]"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm text-[#211C18] flex items-center gap-2">
                                        {addr.label === "Office" ? (
                                            <Briefcase className="w-4 h-4 text-[#8A4526]" />
                                        ) : (
                                            <Home className="w-4 h-4 text-[#8A4526]" />
                                        )}
                                        {addr.label || "Address"}
                                    </span>

                                    {addr.defaultAddress ? (
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#8A4526] text-white 
                                        text-[10px] font-semibold uppercase tracking-wider">
                                            Default
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={defaultingIndex === idx || removingIndex === idx}
                                            onClick={() => handleMakeDefault(idx)}
                                            className="text-xs text-[#8A4526] hover:underline font-medium cursor-pointer 
                                            flex items-center gap-1.5 disabled:opacity-50"
                                        >
                                            {defaultingIndex === idx ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    <span>Setting...</span>
                                                </>
                                            ) : (
                                                "Make default"
                                            )}
                                        </button>
                                    )}
                                </div>

                                <p className="text-xs sm:text-sm text-[#4A423C] leading-relaxed">
                                    {addr.street}{addr.building ? `, Building ${addr.building}` : ""}<br />
                                    {addr.city}, {addr.country} {addr.postalCode ? `· ${addr.postalCode}` : ""}
                                </p>

                                <div className="flex items-center gap-4 pt-2.5 border-t border-[#EDE8E3] text-xs font-medium">
                                    <button
                                        type="button"
                                        onClick={() => handleStartEdit(addr, idx)}
                                        className="text-[#8A4526] hover:underline flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" /> Edit
                                    </button>

                                    <button
                                        type="button"
                                        disabled={removingIndex === idx || defaultingIndex === idx}
                                        onClick={() => handleRemove(idx)}
                                        className="text-[#A83A2C] hover:underline flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                    >
                                        {removingIndex === idx ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                <span>Removing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Remove</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}