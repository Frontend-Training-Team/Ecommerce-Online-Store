import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { postForgotPasswordSendOtp, postForgotPasswordVerifyOtp } from "../../../api/auth.api";

export default function SecurityTab({ user, setActiveTab }) {
    const [step, setStep] = useState(1);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOtp = async () => {
        if (!user?.email) return;
        try {
            setSendingOtp(true);
            await postForgotPasswordSendOtp({ email: user.email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send verification code");
        } finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyAndReset = async (e) => {
        e.preventDefault();
        if (!otp || !newPassword) return toast.error("Please fill in all fields");
        if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

        try {
            setVerifying(true);
            await postForgotPasswordVerifyOtp({
                email: user.email,
                otp: otp.trim(),
                newPassword,
            });
            toast.success("Password changed successfully!");
            setStep(3);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid or expired code");
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col gap-6">

            <div className="flex items-center gap-3 sm:gap-4 self-center sm:self-start">
                <span className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                    ${step >= 1 ? "bg-[#8A4526] text-white" : "bg-[#EDE8E3] text-[#6F655D]"
                    }`}>1</span>
                    <span className="text-xs sm:text-sm font-medium text-[#3A332D]">Verify email</span>
                </span>

                <span className="w-8 sm:w-12 h-[1px] bg-[#D6D0CA]"></span>

                <span className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold 
                    ${step >= 2 ? "bg-[#8A4526] text-white" : "bg-[#EDE8E3] text-[#6F655D]"
                    }`}>2</span>
                    <span className="text-xs sm:text-sm font-medium text-[#3A332D]">New password</span>
                </span>

                <span className="w-8 sm:w-12 h-[1px] bg-[#D6D0CA]"></span>

                <span className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold 
                    ${step === 3 ? "bg-[#2F6B4F] text-white" : "bg-[#EDE8E3] text-[#6F655D]"
                    }`}>3</span>
                    <span className="text-xs sm:text-sm font-medium text-[#3A332D]">Done</span>
                </span>
            </div>

            {step === 1 && (
                <section className="w-full bg-white border border-[#E3DEDA] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-[#EDE8E3] pb-5">
                        <div className="w-12 h-12 rounded-full bg-[#F2EBE5] flex items-center justify-center text-[#8A4526] flex-shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-Serif text-xl sm:text-2xl font-medium text-[#211C18]">Verify it is you</h3>
                            <p className="text-xs sm:text-sm text-[#6F655D] mt-0.5">
                                A one-time verification code will be sent to your registered email address.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Registered email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="h-12 px-4 rounded-xl border border-[#E3DEDA] bg-[#F2F0EE] text-sm text-[#4A423C] 
                            cursor-not-allowed"
                        />
                        <span className="text-[11px] text-[#8C837B]">We will send the 6-digit OTP code to this email.</span>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#EDE8E3]">
                        <button
                            onClick={handleSendOtp}
                            disabled={sendingOtp}
                            className="h-11 px-7 rounded-xl bg-[#8A4526] hover:bg-[#72361D] text-white text-sm 
                            font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                            {sendingOtp && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Send code</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("overview")}
                            className="h-11 px-6 rounded-xl border border-[#D6D0CA] bg-white text-sm font-medium 
                            text-[#3A332D] hover:bg-[#FAF8F6] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </section>
            )}

            {step === 2 && (
                <form
                    onSubmit={handleVerifyAndReset}
                    className="w-full bg-white border border-[#E3DEDA] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
                >
                    <div className="border-b border-[#EDE8E3] pb-5">
                        <h3 className="font-Serif text-xl sm:text-2xl font-medium text-[#211C18]">
                            Enter the code and your new password
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6F655D] mt-1">
                            We sent a 6-digit code to <span className="font-medium text-[#211C18]">{user?.email}</span>.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">6-Digit OTP Code *</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="e.g. 123456"
                                className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                                focus:border-[#8A4526] text-sm text-[#211C18] tracking-widest font-mono focus:outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">New password *</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="At least 6 characters"
                                    className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                                    focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#4A423C] uppercase tracking-wider">Confirm new password *</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Re-enter password"
                                    className="h-12 px-4 rounded-xl border border-[#DDD7D1] bg-[#FAF8F6] focus:bg-white 
                                    focus:border-[#8A4526] text-sm text-[#211C18] focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#EDE8E3]">
                        <button
                            type="submit"
                            disabled={verifying}
                            className="h-11 px-7 rounded-xl bg-[#8A4526] hover:bg-[#72361D] text-white text-sm 
                            font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                            {verifying && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Reset password</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="h-11 px-6 rounded-xl border border-[#D6D0CA] bg-white text-sm font-medium 
                            text-[#3A332D] hover:bg-[#FAF8F6] transition-colors cursor-pointer"
                        >
                            Back
                        </button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <div className="w-full border border-[#CBDFD1] rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center gap-3 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-[#E1EFE5] flex items-center justify-center text-[#2F6B4F]">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-Serif text-2xl font-medium text-[#1F4A36]">Password updated</h3>
                    <p className="text-sm text-[#3A4A41] max-w-[420px]">
                        Your password has been successfully changed. Your account is now secured.
                    </p>
                    <button
                        onClick={() => setActiveTab("overview")}
                        className="mt-3 h-11 px-7 rounded-xl bg-[#8A4526] hover:bg-[#72361D] text-white text-sm 
                        font-medium transition-colors cursor-pointer"
                    >
                        Back to profile overview
                    </button>
                </div>
            )}

        </div>
    );
}