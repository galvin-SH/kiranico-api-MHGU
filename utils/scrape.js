const axios = require('axios');
const cheerio = require('cheerio');

const getWeapons = async (url) => {
    const $ = await axios.get(url).then((res) => cheerio.load(res.data)); // Load the HTML into cheerio
    const weapons = []; // Array of objects containing weapon names and URLs

    $('#list div table tbody tr td > div a').each((i, el) => {
        // For each weapon, push the name and URL into the appropriate arrays
        const weaponName = $(el).text(); // Get the weapon name
        const weaponUrl = $(el).attr('href'); // Get the weapon URL
        if (!weapons.some((weapon) => weapon.name === weaponName)) {
            weapons.push({ name: weaponName }); // Push the weapon name and URL into the array if it's not already added
        }
    });
    return weapons; // Return the weapon data
};

const getUpgradePath = async (url) => {
    const $ = await axios.get(url).then((res) => cheerio.load(res.data)); // Load the HTML into cheerio
    const upgradePath = []; // Array of objects containing weapon levels and their materials
    const weaponNames = []; // Array of weapon names
    const craftMaterials = []; // Array of weapon materials for crafting
    const upgradeMaterials = []; // Array of weapon materials for upgrading

    $('div > div > table > tbody > tr > td:first-child div:first-child').each(
        (i, el) => {
            // For each weapon level, push the level and materials into the appropriate arrays
            const levelName = $(el).text(); // Get the weapon level
            weaponNames.push({
                tier: i + 1,
                name: levelName,
            });
        }
    );
    $('div > div > table > tbody > tr > td:nth-child(3) > small').each(
        (i, el) => {
            // If the element has children, push the children into the array, otherwise add a blank string
            if ($(el).children().length) {
                const materials = []; // Array of materials for the current weapon level
                $(el)
                    .children()
                    .each((i, el) => {
                        // if the element has more than 1 child, push the contents of its second child into the array, otherwise push the element into the array
                        if ($(el).children().length > 1) {
                            materials.push(
                                $(el)
                                    .children()
                                    .eq(1)
                                    .text()
                                    .replace(/[^\x20-\x7E]/gim, '')
                                    .trim()
                            ); // Push the material into the array
                        } else {
                            materials.push(
                                $(el)
                                    .text()
                                    .replace(/[^\x20-\x7E]/gim, '')
                                    .trim()
                            ); // Push the material into the array
                        }
                    });
                craftMaterials.push(materials); // Push the array of materials into the array of weapon materials
            } else {
                craftMaterials.push(['']); // Push a blank string into the array of weapon materials
            }
        }
    );
    $('div > div > table > tbody > tr > td:nth-child(4) > small').each(
        (i, el) => {
            // If the element has children, push the children into the array, otherwise add a blank string
            if ($(el).children().length) {
                const materials = []; // Array of materials for the current weapon level
                $(el)
                    .children()
                    .each((i, el) => {
                        materials.push($(el).text()); // Push the material into the array
                    });
                upgradeMaterials.push(materials); // Push the array of materials into the array of weapon materials
            } else {
                upgradeMaterials.push(['']); // Push a blank string into the array of weapon materials
            }
        }
    );

    for (let i = 0; i < weaponNames.length; i++) {
        upgradePath.push({
            tier: weaponNames[i].tier,
            name: weaponNames[i].level,
            toCraft: craftMaterials[i],
            toUpgrade: upgradeMaterials[i],
        });
    }
    return upgradePath;
};

module.exports = { getWeapons, getUpgradePath };
