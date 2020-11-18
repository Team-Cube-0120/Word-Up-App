const { TODAY, ONE_WEEK, TWO_WEEKS, ONE_MONTH } = require("../enums/FilterOptionsEnum")

/**
 * Maps radio button value to correct time representation (in days)
 * e.g. value 1 which corresponds to 1 week is converted to 7 (which represents days)
 */
const formatFilterOption = async (value) => {
    switch(value) {
        case TODAY:
            return 2;
        case ONE_WEEK:
            return 7;
        case TWO_WEEKS:
            return 14;
        case ONE_MONTH:
            return 30;
        default:
            return 0;
    }
}

exports.formatFilterOption = formatFilterOption;