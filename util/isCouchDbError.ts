export function isCouchDbError(response: any): boolean {
	return response && response.error && response.reason;
}
