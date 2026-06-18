import { headers } from "next/headers";

const HomePage = async () => {
  const resolvedHeaders = await headers();
  const host = resolvedHeaders.get("host");

  const data = await fetch(`http://${host}/api/data`)
    .then(async (response) => await response.json())
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });

  const maxDailyParticipants = 20;

  const processedData = Object.entries(data.availability).flatMap(
    ([year, yearData]) =>
      Object.entries(yearData).flatMap(([month, monthData]) =>
        Object.entries(monthData).map(([day, isAvailable]) => {
          const date = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year.padStart(4, "0")}`;
          const participantCount = data.participantCounts[date] || 0;
          const expectedAvailable = maxDailyParticipants - participantCount;
          const availableCount = isAvailable
            ? expectedAvailable > 0
              ? expectedAvailable
              : 1
            : 0;

          return {
            year,
            month,
            day,
            date,
            isAvailable,
            participantCount,
            availableCount,
          };
        }),
      ),
  );

  return (
    <main>
      {processedData
        .filter((day) => day.participantCount || day.availableCount)

        .map((day) => (
          <div key={day.date}>
            {day.month}/{day.day} {day.participantCount} going,{" "}
            {day.availableCount} spots
          </div>
        ))}
    </main>
  );
};

export default HomePage;
