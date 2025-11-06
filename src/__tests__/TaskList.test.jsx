import { render, screen } from "@testing-library/react";
import TaskList from "../pages/Tasks/TaskList";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";

test("renders Tasks header", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <TaskList />
      </BrowserRouter>
    </Provider>
  );

  const header = screen.getByText(/Tasks/i);
  expect(header).toBeInTheDocument();
});
