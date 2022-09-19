export default (data: string): string =>
	data.replace(/&/g, '&amp;').replace(/-/g, '&#45;');
