import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { AutocompleteMenu } from "./AutocompleteMenu";

afterEach(cleanup);

test("should render without errors", () => {
  render(<AutocompleteMenu />);
});

test("should render list of items", () => {
  const el = render(
    <AutocompleteMenu items={["stout", "whisky", "ale"]} />
  );

  expect(el.queryByText("stout")).toBeInTheDOM();
  expect(el.queryByText("whisky")).toBeInTheDOM();
  expect(el.queryByText("ale")).toBeInTheDOM();
});

describe("#selectNext, #selectPrevious", () => {
  let menu;
  let el;
  let handleSelect;

  beforeEach(() => {
    console.log("beforeEach");
    handleSelect = jest.fn();
    el = render(
      <AutocompleteMenu
        ref={that => (menu = that)}
        items={["stout", "whisky", "ale"]}
        onSelect={handleSelect}
      />
    );
  });

  test("should select first item after the first selectNext call", () => {
    menu.selectNext();
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith("stout");
  });

  test("should correcly handle #selectPrevious in initial state", () => {
    menu.selectPrevious();
    menu.selectNext();
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith("stout");
  });

  test("should handle #selectNext beyond the range", () => {
    menu.selectNext();
    expect(handleSelect).toHaveBeenLastCalledWith("stout");

    menu.selectNext();

    expect(handleSelect).toHaveBeenLastCalledWith("whisky");
    menu.selectNext();
    expect(handleSelect).toHaveBeenLastCalledWith("ale");
    menu.selectNext();
    expect(handleSelect).toHaveBeenCalledTimes(3);
    menu.selectPrevious();
    expect(handleSelect).toHaveBeenLastCalledWith("whisky");
  });
});
