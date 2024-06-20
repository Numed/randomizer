import { FC } from "react";
import Generator from "../Generator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  return (
    <>
      <Generator />
      <ToastContainer />
    </>
  );
};

export default App;
