// ─── State management ────────────────────────────────────────────────────────
export { useCounter } from './use-counter';
export type { UseCounterOptions, UseCounterReturnValue } from './use-counter';

export { useToggle } from './use-toggle';

export { useDisclosure } from './use-disclosure';
export type {
	UseDisclosureOptions,
	UseDisclosureReturnValue,
} from './use-disclosure';

export { useListState } from './use-list-state';
export type {
	UseListStateHandlers,
	UseListStateReturnValue,
} from './use-list-state';

export { useSetState } from './use-set-state';

export { useMap } from './use-map';
export type { UseMapReturnValue } from './use-map';

export { useSet } from './use-set';
export type { UseSetReturnValue } from './use-set';

export { useQueue } from './use-queue';
export type { UseQueueOptions, UseQueueReturnValue } from './use-queue';

export { useStateHistory } from './use-state-history';
export type { UseStateHistoryReturnValue } from './use-state-history';

export { useUncontrolled } from './use-uncontrolled';
export type {
	UseUncontrolledOptions,
	UseUncontrolledReturnValue,
} from './use-uncontrolled';

export { useValidatedState } from './use-validated-state';
export type { UseValidatedStateReturnValue } from './use-validated-state';

export { usePrevious } from './use-previous';

// ─── Debounce & Throttle ──────────────────────────────────────────────────────
export { useDebouncedCallback } from './use-debounced-callback';
export type { UseDebouncedCallbackOptions } from './use-debounced-callback';
export { useDebouncedState } from './use-debounced-state';
export { useDebouncedValue } from './use-debounced-value';

export { useThrottledCallback } from './use-throttled-callback';
export { useThrottledState } from './use-throttled-state';
export { useThrottledValue } from './use-throttled-value';

// ─── Timers ───────────────────────────────────────────────────────────────────
export { useInterval } from './use-interval';
export type {
	UseIntervalOptions,
	UseIntervalReturnValue,
} from './use-interval';

export { useTimeout } from './use-timeout';
export type { UseTimeoutReturnValue } from './use-timeout';

// ─── Network ─────────────────────────────────────────────────────────────────
export { useFetch } from './use-fetch';
export type { UseFetchReturnValue } from './use-fetch';

// ─── DOM & UI ─────────────────────────────────────────────────────────────────
export { useClickOutside } from './use-click-outside';

export { useEventListener } from './use-event-listener';
export { useWindowEvent } from './use-window-event';

export { useMediaQuery } from './use-media-query';
export { useViewportSize } from './use-viewport-size';
export type { ViewportSize } from './use-viewport-size';

export { useElementSize, useResizeObserver } from './use-resize-observer';

export { useMutationObserver } from './use-mutation-observer';
export type { UseMutationObserverOptions } from './use-mutation-observer';

export { useIntersection } from './use-intersection';
export type {
	UseIntersectionOptions,
	UseIntersectionReturnValue,
} from './use-intersection';

export { useInViewport } from './use-in-viewport';
export type { UseInViewportReturnValue } from './use-in-viewport';

export { useScrollIntoView } from './use-scroll-into-view';
export type {
	ScrollIntoViewOptions,
	UseScrollIntoViewReturnValue,
} from './use-scroll-into-view';

export { useWindowScroll } from './use-window-scroll';
export type { WindowScrollPosition } from './use-window-scroll';

export { useMouse } from './use-mouse';
export type { MousePosition, UseMouseOptions } from './use-mouse';

export { clampUseMovePosition, useMove } from './use-move';
export type {
	UseMoveHandlers,
	UseMovePosition,
	UseMoveReturnValue,
} from './use-move';

export { useHover } from './use-hover';
export type { UseHoverReturnValue } from './use-hover';

export { useFocusReturn } from './use-focus-return';
export type { UseFocusReturnOptions } from './use-focus-return';
export { useFocusTrap } from './use-focus-trap';

export { useFocusWithin } from './use-focus-within';
export type {
	UseFocusWithinOptions,
	UseFocusWithinReturnValue,
} from './use-focus-within';

export { useHeadroom } from './use-headroom';
export type { UseHeadroomOptions } from './use-headroom';

// ─── Browser APIs ─────────────────────────────────────────────────────────────
export { useClipboard } from './use-clipboard';
export type {
	UseClipboardOptions,
	UseClipboardReturnValue,
} from './use-clipboard';

export { useColorScheme } from './use-color-scheme';
export type { ColorScheme } from './use-color-scheme';

export { useDocumentTitle } from './use-document-title';
export { useDocumentVisibility } from './use-document-visibility';
export type { DocumentVisibilityState } from './use-document-visibility';

export { useFavicon } from './use-favicon';

export { useHash } from './use-hash';
export type { UseHashOptions, UseHashReturnValue } from './use-hash';

export {
	readLocalStorageValue,
	readSessionStorageValue,
	useLocalStorage,
	useSessionStorage,
} from './use-local-storage';
export type { UseStorageOptions } from './use-local-storage';

export { useNetwork } from './use-network';
export type { NetworkStatus } from './use-network';

export { getOS, useOs } from './use-os';
export type { OS } from './use-os';

export { useIdle } from './use-idle';
export type { UseIdleOptions } from './use-idle';

export { useFullscreen } from './use-fullscreen';
export type { UseFullscreenReturnValue } from './use-fullscreen';
export { usePageLeave } from './use-page-leave';
export { useReducedMotion } from './use-reduced-motion';

export { useTextSelection } from './use-text-selection';
export type { UseTextSelectionReturnValue } from './use-text-selection';

export { useEyeDropper } from './use-eye-dropper';
export type {
	EyeDropperOpenOptions,
	EyeDropperOpenReturnType,
	UseEyeDropperReturnValue,
} from './use-eye-dropper';

export { useFileDialog } from './use-file-dialog';
export type {
	FileDialogOptions,
	UseFileDialogReturnValue,
} from './use-file-dialog';

// ─── React utilities ──────────────────────────────────────────────────────────
export { useDidUpdate } from './use-did-update';
export { useForceUpdate } from './use-force-update';
export { useId } from './use-id';
export { useIsomorphicEffect } from './use-isomorphic-effect';
export { useLogger } from './use-logger';
export { assignRef, mergeRefs, useMergedRef } from './use-merged-ref';
export { useMounted } from './use-mounted';
export { useShallowEffect } from './use-shallow-effect';

// ─── Input & Keyboard ────────────────────────────────────────────────────────
export { getHotkeyHandler, useHotkeys } from './use-hotkeys';
export type { HotkeyItem, HotkeyItemOptions } from './use-hotkeys';

export { usePagination } from './use-pagination';
export type {
	UsePaginationOptions,
	UsePaginationReturnValue,
} from './use-pagination';

export { useInputState } from './use-input-state';
