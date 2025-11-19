// localStorageService.js
import { BehaviorSubject } from "rxjs";
import { useEffect } from "react";

// Hook de suscripción
export function useLocalStorageObserver(callback) {
  useEffect(() => {
    const sub = storage$.subscribe(callback);
    return () => sub.unsubscribe();
  }, [callback]);
}

const storageSubject = new BehaviorSubject(null);

export const storage$ = storageSubject.asObservable();

// Notificador interno para cambios locales
function notify(key, value) {
  storageSubject.next({ key, value });
}

// Set
export function setLS(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
  notify(key, value);
}

// Get
export function getLS(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return data;
  }
}

// Remove
export function removeLS(key) {
  localStorage.removeItem(key);
  notify(key, null);
}

// Listener de cambios entre pestañas
window.addEventListener("storage", (event) => {
  if (event.key) {
    let value;
    try {
      value = event.newValue ? JSON.parse(event.newValue) : null;
    } catch {
      value = event.newValue;
    }
    notify(event.key, value);
  }
});