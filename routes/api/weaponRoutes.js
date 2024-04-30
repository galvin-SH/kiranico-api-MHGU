const router = require('express').Router();
const { getWeapons, getUpgradePath } = require('../../utils/scrape'); // Import the getWeaponData function from scrape.js
const requestUrl = `https://mhgu.kiranico.com/`; // Base URL for building queries

const weapons = {
    GS: requestUrl + `greatsword`,
    LS: requestUrl + `longsword`,
    SNS: requestUrl + `sword`,
    DB: requestUrl + `dualblades`,
    HMR: requestUrl + `hammer`,
    HH: requestUrl + `huntinghorn`,
    LNC: requestUrl + `lance`,
    GL: requestUrl + `gunlance`,
    SWAX: requestUrl + `switchaxe`,
    CB: requestUrl + `chargeblade`,
    IG: requestUrl + `insectglaive`,
    LBG: requestUrl + `lightbowgun`,
    HBG: requestUrl + `heavybowgun`,
    BOW: requestUrl + `bow`,
}; // Object containing all weapon URLs

// The /api/weapons endpoint
router.get('/', async (req, res) => {
    try {
        const weaponData = await getWeapons(weapons.SNS); // Get the weapon data for swords and shields
        res.status(200).json(weaponData); // Respond with the weapon data
    } catch (err) {
        res.status(500).json(err); // If an error occurred, respond with the error
    }
});
// The /api/weapons/GS endpoint
router.get('/GS', async (req, res) => {
    try {
        const weaponData = await getUpgradePath(requestUrl + 'weapon/463a8'); // Get the weapon data for greatswords
        res.status(200).json(weaponData); // Respond with the weapon data
    } catch (err) {
        res.status(500).json(err); // If an error occurred, respond with the error
    }
});

module.exports = router;
