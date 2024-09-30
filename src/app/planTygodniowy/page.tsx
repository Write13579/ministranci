export default function planTygodniowy() {
  enum HourOptions {
    H8 = "8:00",
    H18 = "18:00",
  }

  type DaneType = {
    name: string;
    weekday: string;
    hour: HourOptions;
  };
  const dane: DaneType[] = [
    { name: "patryk", weekday: "monday", hour: HourOptions.H8 },
    { name: "andrzej", weekday: "wednesday", hour: HourOptions.H18 },
  ];

  return (
    /**tu zrobic table a nie 200 spanow */ <div>
      plan tygodniowy
      <div
        id="tabela"
        className="grid grid-cols-7 grid-rows-3 [&>*]:border [&>*]:border-black"
      >
        <span></span>
        <span>sobota</span>
        <span>wtorek</span>
        <span>środa</span>
        <span>czwartek</span>
        <span>piątek</span>
        <span>sobota</span>
        <span>8:00</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>18:00</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
        <span>adam</span>
      </div>
    </div>
  );
}
