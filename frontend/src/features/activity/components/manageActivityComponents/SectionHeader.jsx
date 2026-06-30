export default function SectionHeader({
  title,
  description,
}) {
  return (
    <div className="mb-5">

      <h2 className="text-lg font-bold text-zinc-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm text-zinc-500">
          {description}
        </p>
      )}

    </div>
  );
}