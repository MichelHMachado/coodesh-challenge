/**
 * @jest-environment jsdom
 */

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { RadioContext } from "../contexts/RadioContext";
import RadioCard from "../components/RadioCard";

// Mock station data
const mockStation = {
  name: "Station 1",
  country: "USA",
  countrycode: "US",
  language: "English",
  stationuuid: "1",
  url: "https://8062.brasilstream.com.br/stream?origem=task_site",
};

// Mock HTMLMediaElement.prototype methods
beforeAll(() => {
  jest
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(() => Promise.resolve());
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

// Mock context values
const mockContextValue = {
  stations: [], // You can leave it empty or with mock stations if needed
  favoriteRadios: [],
  selectedStation: mockStation, // Set this if you want a specific station selected
  isPlaying: false,
  setIsPlaying: jest.fn(),
  setStations: jest.fn(),
  setFavoriteRadios: jest.fn(),
  setSelectedStation: jest.fn(),
};

// Render the RadioCard with the mocked context
const renderRadioCardWithMockContext = () => {
  return render(
    <RadioContext.Provider value={mockContextValue}>
      <RadioCard station={mockStation} />
    </RadioContext.Provider>
  );
};

describe("RadioCard component with mocked context", () => {
  it("renders station information correctly", () => {
    renderRadioCardWithMockContext();
    expect(screen.getByText("Station 1")).toBeInTheDocument();
    expect(screen.getByText("USA, US")).toBeInTheDocument();
  });

  it("allows editing the station name", () => {
    renderRadioCardWithMockContext();
    fireEvent.click(screen.getByTestId("edit-button"));

    const input: HTMLInputElement = screen.getByTestId("edit-input");
    fireEvent.change(input, { target: { value: "New Station Name" } });
    expect(input.value).toBe("New Station Name");
  });
});
