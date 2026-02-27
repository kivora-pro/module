'use client';

import { useEffect, useState } from 'react';

export type OS =
	| 'undetermined'
	| 'macos'
	| 'ios'
	| 'windows'
	| 'android'
	| 'linux';

export function getOS(): OS {
	if (typeof window === 'undefined') return 'undetermined';
	const { userAgent } = window.navigator;
	const macos = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/;
	const ios = /(iPhone)|(iPad)|(iPod)/;
	const windows = /(Win32)|(Win64)|(Windows)|(WinCE)/;
	const android = /Android/;
	const linux = /Linux/;

	if (ios.test(userAgent)) return 'ios';
	if (macos.test(userAgent)) return 'macos';
	if (windows.test(userAgent)) return 'windows';
	if (android.test(userAgent)) return 'android';
	if (linux.test(userAgent)) return 'linux';
	return 'undetermined';
}

export function useOs(): OS {
	const [os, setOs] = useState<OS>('undetermined');

	useEffect(() => {
		setOs(getOS());
	}, []);

	return os;
}
