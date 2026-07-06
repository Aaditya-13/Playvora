import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import useActivityForm from "../hooks/useActivityForm";

import ActivityHero from "../components/createActivityComponents/ActivityHero";
import SportSelector from "../components/createActivityComponents/SportSelector";
import BasicDetailsCard from "../components/createActivityComponents/BasicDetailsCard";
import LocationCard from "../components/createActivityComponents/LocationCard";
import ScheduleCard from "../components/createActivityComponents/ScheduleCard";
import GameSettingsCard from "../components/createActivityComponents/GameSettingsCard";
import PricingCard from "../components/createActivityComponents/PricingCard";
import NotesCard from "../components/createActivityComponents/NotesCard";
import PublishBar from "../components/createActivityComponents/PublishBar";

export default function CreateActivity() {
  const navigate = useNavigate();

  const {
    register,
    errors,
    setValue,

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
  } = useActivityForm();


  return (
    <ScreenContainer className="bg-zinc-100 pb-32">

      <PageHeader
        title="Host a Game"
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">

        <ActivityHero />

        <SportSelector
          SPORTS={SPORTS}
          selectedSport={selectedSport}
          setValue={setValue}
          errors={errors}
        />

        <BasicDetailsCard
          register={register}
          errors={errors}
        />

        <LocationCard
          register={register}
          errors={errors}
          latitude={latitude}
          longitude={longitude}
          setValue={setValue}
          searchLocation={searchLocation}
          visibilityRadius={visibilityRadius}
          useCurrentLocation={useCurrentLocation}
        />

        <GameSettingsCard
          register={register}
          errors={errors}
          maxPlayers={maxPlayers}
          visibilityRadius={visibilityRadius}
          increasePlayers={increasePlayers}
          decreasePlayers={decreasePlayers}
          SKILL_LEVELS={SKILL_LEVELS}
          VENUE_TYPES={VENUE_TYPES}
          JOIN_POLICIES={JOIN_POLICIES}
          GENDER_OPTIONS={GENDER_OPTIONS}
          setValue={setValue}
        />

        <ScheduleCard
          register={register}
          errors={errors}
        />

        <PricingCard
          register={register}
          errors={errors}
        />

        <NotesCard
          register={register}
        />

      </div>

      <PublishBar
        submit={submit}
        isPending={isPending}
      />

    </ScreenContainer>
  );
}

