/**
 * Given a timestamp, return the number of days passed relative to the current date
 * @param {*} timestamp in seconds (based on the return type of firestore object)
 */
const calculateDaysPassed = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let currentDate = new Date(Date.now());
    let difference = Math.trunc((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (difference >= 0 && difference <= 1) {
        return "Posted Today";
    } else if (difference < 30) {
        return "Posted " + difference + " days ago";
    } else if (difference >= 30) {
        return "Posted +30 days ago";
    } else {
        return "Date N/A";
    }
}

/**
 * Given a timestamp, return the date format as MM DD YYYY
 * @param {*} timestamp in seconds (based on the return type of firestore object)
 */
const formatToMMDDYYYY = (timestamp) => {
    let date = new Date(timestamp * 1000).toString();
    return date.slice(4, 15);
}

exports.calculateDaysPassed = calculateDaysPassed;
exports.formatToMMDDYYYY = formatToMMDDYYYY;