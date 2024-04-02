import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

export function App() {
  return (
    <main className="space-y-5">
      <Header />
      <AttendeeList />
    </main>
  )
}
