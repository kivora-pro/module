'use client';

import { useEffect, useState } from 'react';

export interface NetworkStatus {
	online: boolean;
	effectiveType: string;
	downlink: number;
	saveData: boolean;
	rtt: number;
}

function getNetworkStatus(): NetworkStatus {
	const connection = (
		navigator as Navigator & {
			connection?: {
				effectiveType?: string;
				downlink?: number;
				saveData?: boolean;
				rtt?: number;
			};
		}
	).connection;
	return {
		online: navigator.onLine,
		effectiveType: connection?.effectiveType ?? '4g',
		downlink: connection?.downlink ?? 1,
		saveData: connection?.saveData ?? false,
		rtt: connection?.rtt ?? 0,
	};
}

export function useNetwork(): NetworkStatus {
	const [status, setStatus] = useState<NetworkStatus>(getNetworkStatus);

	useEffect(() => {
		const update = () => setStatus(getNetworkStatus());

		window.addEventListener('online', update);
		window.addEventListener('offline', update);

		const connection = (
			navigator as Navigator & { connection?: EventTarget }
		).connection;
		connection?.addEventListener('change', update);

		return () => {
			window.removeEventListener('online', update);
			window.removeEventListener('offline', update);
			connection?.removeEventListener('change', update);
		};
	}, []);

	return status;
}
