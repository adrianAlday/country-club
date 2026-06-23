import { headers } from "next/headers";
import Link from "next/link";
import { Libre_Baskerville } from "next/font/google";
import { Fragment } from "react/jsx-runtime";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "block",
});

const HomePage = async () => {
  const resolvedHeaders = await headers();
  const host = resolvedHeaders.get("host");

  const data = await fetch(`http://${host}/api/data`, {
    cache: "no-store",
  })
    .then(async (response) => await response.json())
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });

  const maxDailyParticipants = 20;

  const processedData = Object.entries(data.availability).flatMap(
    ([year, yearData]) =>
      Object.entries(
        yearData as { [key: string]: { [key: string]: number } },
      ).flatMap(([month, monthData]) =>
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
      <div className={`${libreBaskerville.className}`}>
        <div className="mt-2 flex justify-center">
          <div className="flex">
            <div className="text-7xl">⛳</div>

            <div className="ml-4 italic">
              <div className={"text-2xl"}>
                <span className="text-3xl">C</span>OUNTRY{" "}
                <span className="text-3xl">C</span>LUB
              </div>

              <div className="text-xl">
                AT <span className="text-2xl">D</span>RU{" "}
                <span className="text-2xl">H</span>ILL
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "auto",
            marginLeft: "calc((100vw - 100%) / -2)",
            marginRight: "calc((100vw - 100%) / -2)",
            paddingLeft: "calc((100vw - 100%) / 2)",
            paddingRight: "calc((100vw - 100%) / 2)",
          }}
          className="mt-6 py-6 bg-[rgb(0,103,71)] text-[rgb(255,255,255)]"
        >
          <div className="">🏖️ Swim club availability:</div>

          <div
            className="mt-4 grid gap-4"
            style={{ gridTemplateColumns: "repeat(3, max-content)" }}
          >
            {processedData
              .filter((day) => day.participantCount || day.availableCount)
              .map((day) => (
                <Fragment key={day.date}>
                  <div>
                    {
                      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                        new Date(day.date).getDay()
                      ]
                    }
                  </div>
                  <div>
                    <Link
                      target="_blank"
                      href={`https://www.wunderground.com/hourly/us/md/baltimore/KMDBALTI500/date/${day.year.padStart(4, "0")}-${day.month.padStart(2, "0")}-${day.day.padStart(2, "0")}`}
                      className="underline hover:text-[rgb(252,227,0)] active:text-[rgb(252,227,0))]"
                    >
                      {day.month}/{day.day}
                    </Link>
                  </div>

                  <div className="">
                    {day.availableCount} spot
                    {day.availableCount === 1 ? "" : "s"} left
                    {day.availableCount && day.availableCount <= 5 ? "!" : ""}
                  </div>
                </Fragment>
              ))}
          </div>

          <Link
            target="_blank"
            href={
              "https://secure.rec1.com/MD/baltimore-md/catalog/index/b2d35a4538a1f7c7d2115f5730b98a6f?filter=c2VhcmNoPWNvdW50cnklMjBjbHViJTIwZGFpbHklMjBzd2lt#:~:text=country"
            }
          >
            <div className="mt-4 border border-[rgb(255,255,255)] rounded-4xl overflow-hidden w-full hover:border-[rgb(252,227,0)] hover:text-[rgb(252,227,0)] active:border-[rgb(252,227,0)] active:text-[rgb(252,227,0))] py-1 flex items-center justify-center transition-all duration-80 transition-discrete">
              Sign Up country
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <div className="mt-2">Pool boy is looking for work.</div>

          <div className="mt-2">
            Please keep me in mind and also add me on LinkedIn!
          </div>

          <div className="mt-4">
            <Link
              target="_blank"
              href={"https://www.linkedin.com/in/adrianalday"}
            >
              <div className="border border-[rgb(0,103,71)] rounded-4xl overflow-hidden w-full hover:bg-[rgb(0,103,71)] hover:text-[rgb(252,227,0)] active:bg-[rgb(0,103,71)] active:text-[rgb(252,227,0)] py-1 flex items-center justify-center transition-all duration-80 transition-discrete">
                🙏 🙏 Thank you!
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

// dark green
// white text
// light yellow, yellow, red accents
// serif and cursive
