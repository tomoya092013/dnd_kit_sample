const TimeLine = () => {
  const times = [];
  for (let hour = 0; hour <= 24; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  return (
    <div className="flex flex-col">
      {times.map((time, i) => (
        <div
          key={i}
          className="flex items-center w-full justify-center "
          style={{ height: '30px' }}
        >
          <div className="flex w-[7rem]">{time}</div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
