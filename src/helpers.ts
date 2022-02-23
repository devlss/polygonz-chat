export function transformTime(timeString: string) {
	return new Date(timeString).toLocaleTimeString('en-US');
}

const sanitizeRegexp = /[\w\s_!?@#$%|'"/\\.,*+-]/g;
const firstLetterRegexp = /\b[A-Z]/g;
const factor = 2.7;
const offset = 64;

export function generateLogo(title: string, base = 10) {
	const abbr = title.toUpperCase().match(firstLetterRegexp)?.slice(0, 2).join('') || '@';
	const code = Math.floor(abbr.split('').reduce((sum, cur) => sum + cur.charCodeAt(0) - offset, 0) / factor / abbr.length) + 1;

	return [abbr, code];
}

export function debounce(fn: Function, ms = 1000, leading = false) {
	let timeout: NodeJS.Timeout;
	let idle = false;
	return async (...args: unknown[]) => {
		const callFn = fn.bind(null, ...args);
		clearTimeout(timeout);
		if (leading) {
			if (!idle) {
				await callFn();
				idle = true;
			}
			timeout = setTimeout(() => {
				idle = false;
			}, ms);
		} else {
			timeout = setTimeout(callFn, ms);
		}
	};
}

export function throttle(fn: Function, ms = 1000) {
	let idle = false;
	let cache: unknown[];
	return async (...args: unknown[]) => {
		cache = args;
		if (!idle) {
			await fn(...cache);
			idle = true;
			setTimeout(() => {
				idle = false;
				fn(...cache);
			}, ms);
		}
	};
}

export function exist(value: string | number | undefined | null) {
	return !(value === undefined || value === null);
}

export function sanitize(string?: string | null) {
	if (!string) {
		return '';
	}
	return string.match(sanitizeRegexp)?.join('') || '';
}
