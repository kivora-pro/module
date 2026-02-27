'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseStorageOptions<T> {
	key: string;
	defaultValue?: T;
	serialize?: (value: T) => string;
	deserialize?: (value: string) => T;
	getInitialValueInEffect?: boolean;
}

function createStorage<T>(storage: Storage | null) {
	return function useStorage({
		key,
		defaultValue,
		serialize = JSON.stringify,
		deserialize = JSON.parse,
		getInitialValueInEffect = true,
	}: UseStorageOptions<T>): [
		T | undefined,
		(value: T | ((current: T | undefined) => T)) => void,
		() => void,
	] {
		const readStorageValue = useCallback((): T | undefined => {
			if (typeof window === 'undefined' || !storage) {
				return defaultValue;
			}
			try {
				const stored = storage.getItem(key);
				if (stored !== null) {
					return deserialize(stored);
				}
			} catch {
				// ignore
			}
			return defaultValue;
		}, [key, defaultValue, deserialize]);

		const [value, setValue] = useState<T | undefined>(
			getInitialValueInEffect ? defaultValue : readStorageValue(),
		);

		useEffect(() => {
			if (getInitialValueInEffect) {
				setValue(readStorageValue());
			}

			const handleStorage = (event: StorageEvent) => {
				if (event.key === key) {
					if (event.newValue === null) {
						setValue(defaultValue);
					} else {
						try {
							setValue(deserialize(event.newValue));
						} catch {
							setValue(defaultValue);
						}
					}
				}
			};

			window.addEventListener('storage', handleStorage);
			return () => window.removeEventListener('storage', handleStorage);
		}, [
			key,
			defaultValue,
			deserialize,
			getInitialValueInEffect,
			readStorageValue,
		]);

		const setStorageValue = useCallback(
			(val: T | ((current: T | undefined) => T)) => {
				setValue((current) => {
					const nextValue =
						typeof val === 'function'
							? (val as (c: T | undefined) => T)(current)
							: val;
					try {
						storage?.setItem(key, serialize(nextValue));
					} catch {
						// ignore
					}
					return nextValue;
				});
			},
			[key, serialize],
		);

		const removeValue = useCallback(() => {
			storage?.removeItem(key);
			setValue(defaultValue);
		}, [key, defaultValue]);

		return [value, setStorageValue, removeValue];
	};
}

export function readLocalStorageValue<T>({
	key,
	defaultValue,
	deserialize = JSON.parse,
}: Pick<UseStorageOptions<T>, 'key' | 'defaultValue' | 'deserialize'>):
	| T
	| undefined {
	if (typeof window === 'undefined') return defaultValue;
	try {
		const stored = localStorage.getItem(key);
		if (stored !== null) return deserialize(stored);
	} catch {
		// ignore
	}
	return defaultValue;
}

export function readSessionStorageValue<T>({
	key,
	defaultValue,
	deserialize = JSON.parse,
}: Pick<UseStorageOptions<T>, 'key' | 'defaultValue' | 'deserialize'>):
	| T
	| undefined {
	if (typeof window === 'undefined') return defaultValue;
	try {
		const stored = sessionStorage.getItem(key);
		if (stored !== null) return deserialize(stored);
	} catch {
		// ignore
	}
	return defaultValue;
}

const getLocalStorage = () =>
	typeof window !== 'undefined' ? localStorage : null;
const getSessionStorage = () =>
	typeof window !== 'undefined' ? sessionStorage : null;

export const useLocalStorage = <T>(options: UseStorageOptions<T>) =>
	createStorage<T>(getLocalStorage())(options);

export const useSessionStorage = <T>(options: UseStorageOptions<T>) =>
	createStorage<T>(getSessionStorage())(options);
