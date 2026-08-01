import { X, Share2, MessageCircle, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

export default function ShareActivityModal({
  isOpen,
  onClose,
  activityTitle,
  activityId,
}) {
  const [copied, setCopied] = useState(false);

  // Fallback to origin if we somehow don't have window
  const url = typeof window !== "undefined" ? `${window.location.origin}/activity/${activityId}` : "";
  const shareText = `Hey! Check out this activity on Playvora: ${activityTitle}.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Playvora Activity",
          text: shareText,
          url,
        });
      }
    } catch (e) {
      console.log("Error sharing natively");
    }
  };

  const handleWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 p-5">
                <h3 className="text-lg font-bold text-zinc-900">Share Activity</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center bg-zinc-50/50 p-8 pb-6">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                  <QRCodeSVG 
                    value={url} 
                    size={200}
                    level="H" 
                    imageSettings={{
                      src: "/playvora-logo.png",
                      height: 48,
                      width: 48,
                      excavate: true,
                    }}
                  />
                </div>
                <p className="mt-4 text-center text-sm font-medium text-zinc-500">
                  Scan code to view details
                </p>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-1 gap-2 p-4">
                
                {/* Native Share (only if supported) */}
                {typeof navigator !== "undefined" && navigator.share && (
                  <button 
                    onClick={handleNativeShare}
                    className="flex w-full items-center justify-between rounded-2xl bg-zinc-100 p-4 font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <Share2 className="h-5 w-5 text-zinc-500" />
                      <span>Share via...</span>
                    </div>
                  </button>
                )}

                {/* WhatsApp */}
                <button 
                  onClick={handleWhatsApp}
                  className="flex w-full items-center justify-between rounded-2xl bg-[#25D366]/10 p-4 font-semibold text-[#1DA851] transition-colors hover:bg-[#25D366]/20 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </div>
                </button>

                {/* Copy Link */}
                <button 
                  onClick={handleCopy}
                  className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    {copied ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-zinc-400" />
                    )}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </div>
                </button>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
