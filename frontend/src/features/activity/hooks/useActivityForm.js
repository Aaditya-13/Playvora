import { useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createActivitySchema } from "../validation/activity.schema";
import useCreateActivity from "./useCreateActivity";
import {
  getCoordinatesFromAddress,
  getAddressFromCoordinates
} from "../../../utils/mapUtils";

export const SPORTS = [
  { value: "football", label: "Football", emoji: "⚽" },
  { value: "basketball", label: "Basketball", emoji: "🏀" },
  { value: "cricket", label: "Cricket", emoji: "🏏" },
  { value: "badminton", label: "Badminton", emoji: "🏸" },
  { value: "tennis", label: "Tennis", emoji: "🎾" },
];

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const VENUE_TYPES = [
  { value: "outdoor", label: "Outdoor" },
  { value: "indoor", label: "Indoor" },
];

export const JOIN_POLICIES = [
  { value: "open", label: "Instant Join" },
  { value: "approval", label: "Approval Required" },
];

export const GENDER_OPTIONS = [
  { value: "any", label: "Anyone" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function useActivityForm() {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useCreateActivity();

  const form = useForm({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: "",
      description: "",
      sport: "football",

      groundName: "",
      address: "",

      dateInput: "",
      timeInput: "",

      latitude: 20.0059,
      longitude: 73.791,

      maxPlayers: 10,

      skillLevel: "beginner",
      venueType: "outdoor",
      joinPolicy: "open",
      genderPreference: "any",

      cost: {
        amount: 0,
        currency: "INR",
        description: "Per player",
      },

      notes: "",

      visibilityRadius: 5000,
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = form;

  const selectedSport = useWatch({
    control,
    name: "sport",
  });

  const maxPlayers = useWatch({
    control,
    name: "maxPlayers",
  });

  const visibilityRadius = useWatch({
    control,
    name: "visibilityRadius",
  });

  const latitude = useWatch({
    control,
    name: "latitude",
  });

  const longitude = useWatch({
    control,
    name: "longitude",
  });


  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setValue("latitude", coords.latitude, {
          shouldValidate: true,
        });

        setValue("longitude", coords.longitude, {
          shouldValidate: true,
        });

        const address = await getAddressFromCoordinates(
          coords.latitude,
          coords.longitude
        );

        if (address) {
          setValue("address", address, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        toast.success("Current location detected.");
      },
      () => {
        toast.error("Unable to fetch your location.");
      }
    );
  };
  const searchLocation = async () => {
    const address = form.getValues("address");

    if (!address.trim()) {
      toast.error("Please enter an address.");
      return;
    }

    const coordinates = await getCoordinatesFromAddress(address);

    if (!coordinates) {
      toast.error("Location not found.");
      return;
    }

    setValue("latitude", coordinates.latitude, {
      shouldValidate: true,
    });

    setValue("longitude", coordinates.longitude, {
      shouldValidate: true,
    });

    toast.success("Location found.");
  };

  const increasePlayers = () => {
    setValue("maxPlayers", Math.min(50, maxPlayers + 1), {
      shouldValidate: true,
    });
  };

  const decreasePlayers = () => {
    setValue("maxPlayers", Math.max(2, maxPlayers - 1), {
      shouldValidate: true,
    });
  };

  const submit = handleSubmit((data) => {
    if (!data.dateInput || !data.timeInput) {
      toast.error("Please select both date and time.");
      return;
    }

    const scheduledAt = new Date(`${data.dateInput}T${data.timeInput}`);

    if (Number.isNaN(scheduledAt.getTime())) {
      toast.error("Invalid date or time.");
      return;
    }

    const payload = {
      title: data.title,
      description: data.description,
      sport: data.sport,

      groundName: data.groundName,
      address: data.address,

      latitude: data.latitude,
      longitude: data.longitude,

      scheduledAt: scheduledAt.toISOString(),

      maxPlayers: data.maxPlayers,

      skillLevel: data.skillLevel,
      venueType: data.venueType,
      joinPolicy: data.joinPolicy,
      genderPreference: data.genderPreference,

      cost: {
        amount: Number(data.cost.amount),
        currency: "INR",
        description: "Per player",
      },

      notes: data.notes,

      visibilityRadius: data.visibilityRadius,
    };


    console.log(data);
    console.log(payload);
    create(payload, {
      onSuccess: () => {
        toast.success("Activity published successfully.");

        reset();

        navigate("/");
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to create activity."
        );
      },
    });


  });

  return {
    form,

    register,
    errors,

    reset,

    setValue,
    control,

    submit,

    isPending,

    selectedSport,
    maxPlayers,
    visibilityRadius,
    latitude,
    longitude,

    searchLocation,

    increasePlayers,
    decreasePlayers,

    useCurrentLocation,

    SPORTS,
    SKILL_LEVELS,
    VENUE_TYPES,
    JOIN_POLICIES,
    GENDER_OPTIONS,
  };
}