import ScreenContainer from "../../../components/ui/ScreenContainer";

export default function DashboardLoading() {
  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-5">

        <div className="h-36 animate-pulse rounded-[32px] bg-zinc-200" />

        <div className="grid grid-cols-3 gap-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-[24px] bg-zinc-200"
            />
          ))}

        </div>

        {[1, 2].map((section) => (
          <div
            key={section}
            className="space-y-4"
          >

            <div className="h-6 w-40 animate-pulse rounded bg-zinc-200" />

            {[1, 2].map((card) => (
              <div
                key={card}
                className="h-64 animate-pulse rounded-[28px] bg-zinc-200"
              />
            ))}

          </div>
        ))}

      </div>

    </ScreenContainer>
  );
}