import dayjs from "dayjs";

import AppRouter from "@routes";

import "dayjs/locale/vi";

dayjs.locale("vi");

function App() {
  return <AppRouter />;
}

export default App;
