import { RadioStation, RadioStationData } from "./models/radioStation";

export const DB_CONFIG = {
  dbName: "RadioDB",
  version: 1,
  stores: ["stations", "favorite_stations"],
};

export function openDatabase(
  dbName: string,
  version: number,
  stores: string[]
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      stores.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id" });
        }
      });
    };
  });
}

export function addData(
  db: IDBDatabase,
  storeName: string,
  data: RadioStation | RadioStationData
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export function getData(
  db: IDBDatabase,
  storeName: string,
  key: string
): Promise<RadioStation[] | RadioStationData> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function getAllData(
  db: IDBDatabase,
  storeName: string
): Promise<RadioStation[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function deleteData(
  db: IDBDatabase,
  storeName: string,
  key: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export const updateStationName = async (
  db: IDBDatabase,
  storeName: string,
  stationKey: string,
  newName: string
) => {
  const transaction = db.transaction(storeName, "readwrite");
  const objectStore = transaction.objectStore(storeName);

  const getRequest = objectStore.get(stationKey);

  getRequest.onsuccess = () => {
    const stationData = getRequest.result;

    if (stationData) {
      stationData.data.name = newName;

      const updateRequest = objectStore.put(stationData);

      updateRequest.onsuccess = () => {};

      updateRequest.onerror = (event) => {
        console.error("Failed to update station", event);
      };
    } else {
      console.error("Station not found");
    }
  };

  getRequest.onerror = (event) => {
    console.error("Failed to retrieve station", event);
  };
};
