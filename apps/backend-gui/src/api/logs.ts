import { LogEntry, LogType } from "@/types";

export async function getLogs(
  type: LogType,
  time: string
): Promise<LogEntry[]> {
  try {
    const res = await fetch(`/api/logs?type=${type}&time=${time}`);
    if (res.ok) {
      const { data } = await res.json();
      return data ?? [];
    } else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// const [logs, setLogs] = useState<LogEntry[]>([]);
// const [filter, setFilter] = useState<Filter>({
//   type: "all",
//   time: "1",
// });

// useEffect(() => {
//   const getLogs = async () => {
//     try {
//       const res = await fetch(
//         `/api/logs?type=${filter.type}&time=${filter.time}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setLogs(data.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getLogs();
//   const update = setInterval(getLogs, 60_000);
//   return () => clearInterval(update);
// }, [filter.time, filter.type]);
