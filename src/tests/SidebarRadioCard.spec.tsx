/**
 * @jest-environment jsdom
 */

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import SidebarRadioCard from "../components/SidebarRadioCard";
import { RadioStation } from "../database/models/radioStation";

const mockStation: RadioStation = {
  stationuuid: "12345",
  name: "Test Station",
  url: "http://test-url.com",
  language: "English",
  country: "USA",
  countrycode: "US",
};

beforeAll(() => {
  const mockOpen = jest.fn(() => {
    return {
      onsuccess: {
        // Using a mock implementation for onsuccess
        addEventListener: jest.fn((event, callback) => {
          if (event === "success") {
            callback();
          }
        }),
      },
      onerror: {
        // Using a mock implementation for onerror
        addEventListener: jest.fn((event, callback) => {
          if (event === "error") {
            callback();
          }
        }),
      },
      result: {
        transaction: jest.fn(() => ({
          objectStore: jest.fn(() => ({
            // Add any methods you plan to use from objectStore here
            add: jest.fn(),
            get: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          })),
        })),
      },
      cmp: jest.fn(),
      databases: jest.fn().mockResolvedValue([]), // Assuming databases return a Promise
      deleteDatabase: jest.fn().mockResolvedValue(undefined), // Assuming deleteDatabase returns a Promise
    };
  });

  const mockIndexedDB = {
    open: mockOpen,
  };

  global.indexedDB = mockIndexedDB as unknown as IDBFactory; // Type assertion to IDBFactory
});

describe("SidebarRadioCard", () => {
  let setSelectedStation: jest.Mock;
  let setFavoriteRadios: jest.Mock;

  beforeEach(() => {
    setSelectedStation = jest.fn();
    setFavoriteRadios = jest.fn();
  });

  test("renders the station name", () => {
    render(
      <SidebarRadioCard
        station={mockStation}
        isSelected={false}
        setSelectedStation={setSelectedStation}
        setFavoriteRadios={setFavoriteRadios}
      />
    );

    expect(screen.getByText(mockStation.name)).toBeInTheDocument();
  });

  test("calls setSelectedStation when clicked", () => {
    render(
      <SidebarRadioCard
        station={mockStation}
        isSelected={false}
        setSelectedStation={setSelectedStation}
        setFavoriteRadios={setFavoriteRadios}
      />
    );

    fireEvent.click(screen.getByText(mockStation.name));

    expect(setSelectedStation).toHaveBeenCalledWith(mockStation);
  });
});
