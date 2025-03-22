import { useCallback } from "react";

/**
 * A hook that provides a way to save and load data to the local storage.
 * We use this to save the sudoku game state to the local storage.
 */
function useLocalStorage() {
	const save = useCallback((key: string, data: unknown) => {
		localStorage.setItem(key, JSON.stringify(data));
	}, []);

	const load = useCallback(<T>(key: string): T | null => {
		const data = localStorage.getItem(key);
		return data ? (JSON.parse(data) as T) : null;
	}, []);

	return { save, load };
}

export default useLocalStorage;
