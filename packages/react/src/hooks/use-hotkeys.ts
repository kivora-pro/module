'use client';

import React, { useEffect } from 'react';

export interface HotkeyItemOptions {
	preventDefault?: boolean;
}

export type HotkeyItem = [
	string,
	(event: KeyboardEvent) => void,
	HotkeyItemOptions?,
];

function parseHotkey(hotkey: string): {
	key: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
	alt: boolean;
} {
	const parts = hotkey.toLowerCase().split('+');
	const key = parts[parts.length - 1] ?? '';
	return {
		key,
		ctrl: parts.includes('ctrl') || parts.includes('control'),
		meta: parts.includes('meta') || parts.includes('mod'),
		shift: parts.includes('shift'),
		alt: parts.includes('alt'),
	};
}

function shouldFireEvent(
	event: KeyboardEvent,
	tagsToIgnore: string[],
	triggerOnContentEditable: boolean,
): boolean {
	if (event.target instanceof HTMLElement) {
		if (triggerOnContentEditable) return true;
		return !tagsToIgnore.includes(event.target.tagName);
	}
	return true;
}

export function getHotkeyHandler(
	hotkeys: HotkeyItem[],
): (event: KeyboardEvent | React.KeyboardEvent) => void {
	return (event: KeyboardEvent | React.KeyboardEvent) => {
		const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;

		hotkeys.forEach(([hotkey, handler, options = {}]) => {
			const parsed = parseHotkey(hotkey);
			const { preventDefault = true } = options;

			const hotkeyMatches =
				(parsed.key === nativeEvent.key.toLowerCase() ||
					parsed.key === nativeEvent.code.toLowerCase()) &&
				parsed.shift === nativeEvent.shiftKey &&
				parsed.alt === nativeEvent.altKey &&
				(parsed.ctrl ? nativeEvent.ctrlKey : true) &&
				(parsed.meta ? nativeEvent.metaKey : true);

			if (hotkeyMatches) {
				if (preventDefault) nativeEvent.preventDefault();
				handler(nativeEvent);
			}
		});
	};
}

export function useHotkeys(
	hotkeys: HotkeyItem[],
	tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
	triggerOnContentEditable = false,
): void {
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (!shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable))
				return;
			getHotkeyHandler(hotkeys)(event);
		};

		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [hotkeys, tagsToIgnore, triggerOnContentEditable]);
}
