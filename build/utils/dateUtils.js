"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.parseDate = void 0;
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
};
exports.parseDate = parseDate;
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
exports.formatDate = formatDate;
