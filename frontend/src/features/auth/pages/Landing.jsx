import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, Users, Calendar, ArrowRight, UserPlus, LogIn, UserCircle2 } from "lucide-react";

import useGuestLogin from "../hooks/useGuestLogin";
import ROUTES from "../../../constants/routes";
import QUERY_KEYS from "../../../constants/queryKeys";

export default function Landing() {
  const guestMutation = useGuestLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleGuestLogin = async () => {
    try {
      await guestMutation.mutateAsync();
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOTSTRAP,
      });
      toast.success("Welcome to Playvora!");
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Guest login failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
      
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Hero & Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.img 
            variants={itemVariants}
            src="/playvora-logo.png" 
            alt="Playvora Logo" 
            className="w-24 h-24 lg:w-32 lg:h-32 mb-8 object-contain drop-shadow-md rounded-2xl"
          />

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-tight tracking-tight"
          >
            Your City. <br className="hidden lg:block"/>
            <span className="text-[#1FAA59]">Your Sport.</span> <br className="hidden lg:block"/>
            Your Game.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-5 text-lg font-medium text-zinc-600 max-w-md lg:max-w-lg"
          >
            Playvora makes it incredibly easy to find and organize sports activities around you.
          </motion.p>

          <div className="mt-10 space-y-4 w-full max-w-sm lg:max-w-md">
            {[
              { icon: MapPin, text: "Discover nearby sports activities instantly" },
              { icon: Users, text: "Join existing games and meet new friends" },
              { icon: Calendar, text: "Organize and host your own events" }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1FAA59]/10 text-[#1FAA59]">
                  <feature.icon size={24} />
                </div>
                <span className="text-zinc-700 font-bold">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Authentication Options */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md mx-auto lg:max-w-none flex flex-col gap-4"
        >
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-zinc-900 mb-2 text-center lg:text-left">Get Started</h2>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to={ROUTES.REGISTER} className="flex items-center justify-between w-full bg-[#1FAA59] p-5 rounded-2xl text-white shadow-md shadow-[#1FAA59]/30 transition-colors hover:bg-[#1a904b]">
                <div className="flex items-center gap-4">
                  <UserPlus size={24} />
                  <span className="text-lg font-bold">Create Account</span>
                </div>
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to={ROUTES.LOGIN} className="flex items-center justify-between w-full bg-zinc-900 p-5 rounded-2xl text-white shadow-md shadow-zinc-900/20 transition-colors hover:bg-zinc-800">
                <div className="flex items-center gap-4">
                  <LogIn size={24} />
                  <span className="text-lg font-bold">Log In</span>
                </div>
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm text-zinc-500 font-bold">OR</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              onClick={handleGuestLogin}
              disabled={guestMutation.isPending}
              className="flex items-center justify-between w-full bg-[#1FAA59]/10 border border-[#1FAA59]/20 p-5 rounded-2xl text-[#1FAA59] transition-colors hover:bg-[#1FAA59]/20 disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <UserCircle2 size={24} />
                <span className="text-lg font-bold">
                  {guestMutation.isPending ? "Entering..." : "Continue as Guest"}
                </span>
              </div>
              <ArrowRight size={20} />
            </motion.button>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}