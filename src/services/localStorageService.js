import { BehaviorSubject } from "rxjs";
import { useEffect } from "react";

/**
 * Hook que observa los cambios emitidos por el observable del localStorage.
 *
 * @param {function({key: string, value: any}): void} callback
 *        Función que será ejecutada cada vez que se detecte un cambio.
 *
 * @returns {void}
 *
 * @example
 * useLocalStorageObserver(({ key, value }) => {
 *   console.log("Cambió:", key, value);
 * });
 */
export function useLocalStorageObserver(callback) {
  useEffect(() => {
    const sub = storage$.subscribe(callback);
    return () => sub.unsubscribe();
  }, [callback]);
}

/**
 * Sujeto interno que emite eventos cuando el localStorage cambia.
 * No debe exportarse directamente.
 * @type {BehaviorSubject<{key: string, value: any} | null>}
 */
const storageSubject = new BehaviorSubject(null);

/**
 * Observable público que notifica cualquier cambio del localStorage.
 * @type {import("rxjs").Observable<{key: string, value: any} | null>}
 */
export const storage$ = storageSubject.asObservable();

/**
 * Notifica a todos los suscriptores que hubo un cambio en el localStorage.
 *
 * @param {string} key - Llave del localStorage que cambió.
 * @param {any} value - Nuevo valor asociado a la llave.
 * @returns {void}
 */
function notify(key, value) {
  storageSubject.next({ key, value });
}

/**
 * Guarda un valor en el localStorage y notifica el cambio.
 *
 * @param {string} key - Llave donde se almacenará el valor.
 * @param {any} value - Valor que será almacenado.
 * @returns {void}
 *
 * @example
 * setLS("user", { name: "Stiven" });
 */
export function setLS(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
  notify(key, value);
}

/**
 * Obtiene un valor del localStorage y lo parsea automáticamente.
 *
 * @param {string} key - Llave del valor almacenado.
 * @returns {any | null} El valor recuperado o `null` si no existe.
 *
 * @example
 * const user = getLS("user");
 */
export function getLS(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return data;
  }
}

/**
 * Elimina un valor del localStorage y notifica el cambio.
 *
 * @param {string} key - Llave del valor a eliminar.
 * @returns {void}
 *
 * @example
 * removeLS("user");
 */
export function removeLS(key) {
  localStorage.removeItem(key);
  notify(key, null);
}

/**
 * Listener que detecta cambios en el localStorage cuando provienen
 * de otras pestañas del navegador.
 *
 * @event storage
 * @param {StorageEvent} event - Evento generado por el navegador.
 */
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
