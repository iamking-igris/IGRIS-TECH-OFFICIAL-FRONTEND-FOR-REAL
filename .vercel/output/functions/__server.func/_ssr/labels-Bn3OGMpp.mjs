import { t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/labels-Bn3OGMpp.js
function formatDate(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return format(date, "d MMM yyyy");
}
function formatDateTime(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return format(date, "d MMM yyyy, HH:mm");
}
function reviewDisplayStatus(review) {
	if (review.status === "pending" || review.status === "rejected") return review.status;
	if (review.published) return "published";
	return "approved";
}
//#endregion
export { formatDateTime as n, reviewDisplayStatus as r, formatDate as t };
