const NAME_MAX = 30;
const SHORT_DESC_MAX = 100;
const FULL_DESC_MAX = 500;

const city = ['London', 'Paris', 'Moscow', 'Kyiv', 'Dubai', 'New York City', 'Singapore', 'Tokyo'];
const nameWords = ['IT', 'company', 'systems', 'hynix', 'technology', 'unicom', 'data', 'automatic', 'processing'];
const descWords = ['design', 'in', 'a', 'and', 'sale', 'the', 'of', 'computers', 'segments', 'consists',
'as', 'well', 'following', 'wearables', 'accessories', 'smartphone', 'personal', 'tablets', 'used', 'user', 'giant',
'greedy', 'reduce', 'clever', 'start', 'respect', 'card', 'male', 'female', 'earn', 'borrow', 'spark', 'lyrical',
'melt', 'flimsy', 'shoe', 'polish', 'health', 'hilarious', 'awake', 'scream', 'moldy', 'buzz', '.', ',', '!'];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

getRandomInfo = function() {
    let name = ``;
    let shortDesc = ``;
    let fullDesc = ``;

    let isNextSymbolCapitalize = true;
    let isSpecSymbolExist = false;

    while (name.length < NAME_MAX) {
        name += `${nameWords[getRandomInt(nameWords.length)]}`
        if (name.length < NAME_MAX-1) {
            name += ` `;
        }
    }

    while (shortDesc.length < SHORT_DESC_MAX) {
        let word = descWords[getRandomInt(descWords.length-1)];
        if(isSpecSymbolExist) {
            word = descWords[getRandomInt(descWords.length-3)];
            isSpecSymbolExist = false;
        }
        if (isNextSymbolCapitalize) {
            if (!(shortDesc.length === 0)) {
                shortDesc += ` `;
            }
            shortDesc += `${capitalizeFirstLetter(word)}`;
            isNextSymbolCapitalize = false;
        }
        else if (word === '.') {
            shortDesc += word;
            isSpecSymbolExist = true;
            isNextSymbolCapitalize = true;
        }
        else if (word === ',') {
            shortDesc += word;
            isSpecSymbolExist = true;
        }
        else {
            shortDesc += ` ${word}`;
        }
    }

    isNextSymbolCapitalize = true;
    isSpecSymbolExist = false;

    while (fullDesc.length < FULL_DESC_MAX) {
        let word = descWords[getRandomInt(descWords.length)];
        if(isSpecSymbolExist) {
            word = descWords[getRandomInt(descWords.length-3)];
            isSpecSymbolExist = false;
        }
        if (isNextSymbolCapitalize) {
            if (!(fullDesc.length === 0)) {
                fullDesc += ` `;
            }
            fullDesc += `${capitalizeFirstLetter(word)}`;
            isNextSymbolCapitalize = false;
        }
        else if (word === '.') {
            fullDesc += word;
            isSpecSymbolExist = true;
            isNextSymbolCapitalize = true;
        }
        else if (word === '!') {
            fullDesc += `${word} `;
            isSpecSymbolExist = true;
            isNextSymbolCapitalize = true;
        }
        else if (word === ',') {
            fullDesc += word;
            isSpecSymbolExist = true;
        }
        else {
            fullDesc += ` ${word}`;
        }
    }

    if (!(fullDesc.charAt(fullDesc.length-1) === '.')) {
        fullDesc += `.`;
    }

    let randomInfo = {
        title: name,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        cityCenter: city[getRandomInt(city.length)],
        requestedMoney: getRandomInt(10000000)+1
    };
    return randomInfo;
}

// let getResult = async function() {
//     let obj = await getRandomInfo();
//     return obj;
// }
//let getResult = getRandomInfo();

exports.getRandomInfo = getRandomInfo;
//module.exports = getResult;
