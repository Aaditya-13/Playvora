import { useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Minus, Plus, MapPin, Link2 } from "lucide-react";
import { toast } from "sonner";

import ScreenContainer from "../../../components/ui/ScreenContainer.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";
import Button from "../../../components/ui/Button.jsx";

import { createActivitySchema } from "../validation/activity.schema.js";
import useCreateActivity from "../hooks/useCreateActivity.js";
import { extractCoordinatesFromUrl, getCoordinatesFromAddress } from "../../../utils/mapUtils.js";

const SPORTS = ["football", "basketball", "cricket", "badminton", "tennis"];

export default function CreateActivity() {
  const navigate = useNavigate();
  const { mutate: create, isPending } = useCreateActivity();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      sport: "football",
      skillLevel: "any",
      venueType: "outdoor",
      joinPolicy: "approval",
      genderPreference: "any",
      maxPlayers: 10,
      mapLink: "",
      cost: { amount: 0, currency: "INR", description: "" },
      latitude: 20.0059, 
      longitude: 73.7910,
    },
  });

  const selectedSport = useWatch({ control, name: "sport" });
  const maxPlayers = useWatch({ control, name: "maxPlayers" });

  const handleAddressBlur = async (e) => {
    const address = e.target.value;
    if (!address) return;

    const coords = await getCoordinatesFromAddress(address);
    if (coords) {
      setValue("latitude", coords.latitude);
      setValue("longitude", coords.longitude);
      toast.success("Location found automatically.");
    }
  };

  const onSubmit = (data) => {
    const combinedDateTime = new Date(`${data.dateInput}T${data.timeInput}`).toISOString();
    
    const payload = {
      ...data,
      scheduledAt: combinedDateTime,
    };
    
    if (payload.mapLink) {
      const coords = extractCoordinatesFromUrl(payload.mapLink);
      
      if (coords) {
        payload.latitude = coords.latitude;
        payload.longitude = coords.longitude;
      } else if (payload.latitude === 20.0059 && payload.longitude === 73.7910) {
        toast.warning("Could not extract coordinates from link. Using address or default location.");
      }
    }

    delete payload.dateInput;
    delete payload.timeInput;
    delete payload.mapLink;

    create(payload);
  };

  return (
    <ScreenContainer className="bg-zinc-50 pb-24">
      <PageHeader 
        leftNode={
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
        }
        title="Host a Game" 
      />

      <div className="px-4 mt-4 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-zinc-900 mb-2 block">Select Sport</label>
              <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SPORTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("sport", s)}
                    className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-bold capitalize transition-all ${
                      selectedSport === s
                        ? "border-green-600 bg-green-50 text-green-700 shadow-sm"
                        : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.sport && <p className="text-xs text-red-500 mt-1">{errors.sport.message}</p>}
            </div>
            
            <div>
              <label className="text-sm font-bold text-zinc-900 mb-1 block">Title</label>
              <input 
                {...register("title")} 
                placeholder="e.g. Sunday Turf War"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
          </div>

          <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-zinc-900 mb-1 block">Ground / Location</label>
              <input 
                {...register("groundName")} 
                placeholder="e.g. City Turf"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all mb-3"
              />
              {errors.groundName && <p className="text-xs text-red-500 mt-1">{errors.groundName.message}</p>}
              
              <div className="relative mb-3">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  {...register("address")} 
                  onBlur={handleAddressBlur}
                  placeholder="Full Address"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all"
                />
              </div>
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}

              <div className="relative">
                <Link2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  {...register("mapLink")} 
                  placeholder="Google Maps Link (Optional)"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all"
                />
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-1 pl-1">
                If left blank, we will try to find the location based on the address.
              </p>
              {errors.mapLink && <p className="text-xs text-red-500 mt-1">{errors.mapLink.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-zinc-900 mb-1 block">Date</label>
                <input 
                  type="date"
                  {...register("dateInput")} 
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-zinc-900 mb-1 block">Time</label>
                <input 
                  type="time"
                  {...register("timeInput")} 
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-zinc-900 block">Max Players</label>
                <p className="text-xs text-zinc-500 mt-0.5">Total spots available</p>
              </div>
              <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl p-1">
                <button 
                  type="button"
                  onClick={() => setValue("maxPlayers", Math.max(2, maxPlayers - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-zinc-200 text-zinc-600 active:scale-95 transition-transform"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-lg w-6 text-center">{maxPlayers}</span>
                <button 
                  type="button"
                  onClick={() => setValue("maxPlayers", Math.min(50, maxPlayers + 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-zinc-200 text-zinc-600 active:scale-95 transition-transform"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-zinc-900 mb-1 block">Cost per player (₹)</label>
              <input 
                type="number"
                {...register("cost.amount")} 
                placeholder="0 for free"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all"
              />
              {errors.cost?.amount && <p className="text-xs text-red-500 mt-1">{errors.cost.amount.message}</p>}
            </div>

            <div>
              <label className="text-sm font-bold text-zinc-900 mb-1 block">Notes (Optional)</label>
              <textarea 
                {...register("notes")} 
                placeholder="Any specific rules, gear needed, or meeting point?"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all min-h-[100px] resize-y"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 text-base mt-2" disabled={isPending}>
            {isPending ? "Publishing Activity..." : "Publish Activity"}
          </Button>

        </form>
      </div>
    </ScreenContainer>
  );
}