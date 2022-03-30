// const eBayApi = require('@hendt/ebay-api');
// const fs = require('fs');
// const fsp = fs.promises;
// const path = require('path');
// const axios = require('axios');
// const FormData = require('form-data');




const eBay = new eBayApi({
    appId:  'LiebtecG-RevisePr-SBX-8c6cc25dc-87a1cf4f',
    certId: 'PRD-c6cc25dc5cd0-e08a-44b3-85f7-844a',
    sandbox: false,

    siteId: eBayApi.SiteId.EBAY_US , // required for traditional APIs, see https://developer.ebay.com/DevZone/merchandising/docs/Concepts/SiteIDToGlobalID.html 

    marketplaceId: eBayApi.MarketplaceId.EBAY_US,  // default. required for RESTful APIs
    contentLanguage: eBayApi.ContentLanguage.en_US, // default

    // optional paramenters, should be omitted if not used

    devId:  '6828514c-d0ee-48cb-bf47-a2c5e3a3e7a1',  // required for traditional Trading API
    ruName: 'Liebtec_GmbH-LiebtecG-Revise-xvpssqv',   // 'RuName' (eBay Redirect URL name) required for authorization code grant

    authToken: 'AgAAAA**AQAAAA**aAAAAA**PlraYQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6MHl4egCZeDqQmdj6x9nY+seQ**2s0DAA**AAMAAA**fPMLpcfRfODufDZi0MRuswY7ptmPn+wYmp747Vo4+fDDSH+f4eISNik/q33TI/1wiM/+gjaPIOo29b4Cix3G7p4NsGkehTWe1X36ZcNbEFu6WGL9be8L/4NFa0CpMg7EVHhkpDvlkZdgmmR4RoIRxnS7k/gM11nWlZFKAJObMdBLiL+tuq1NO2KCmsHlA0xdrZ3Y58/44eil9fzfXth/aQ16Pp8DpiPLV+DpcJWpjIjkDvkACY7Q0sSmEe93MYirfw7+4Hs957a0DST1SPVuF+2b6Ayea1nqU191bjdWfR7LqrHKW6cEn0QBGbRgQrIYeixwZvVHR6DgRUkTn7SWVCSJVUgmueu365ObXZgQKWQEWJlG2l8vgM/aYH81RS+FDzS5te7g2NLOuwKH8z3XxBZbah1L+Yr0IuhEFvmAedKy2f0+5pfAj8q7cDWCOTumSfkJPz2MO/W/g5K2NxKId/YmnoBow5Dbp+ei/YRfhKTiSq8W1tvvTFEfIKeRA/G0giAOmW1Ki4hk0ehrgu303CEEyVRHTqzb/FYSa+t/t0UJymr2S/jWoea/9aQvNIR651zLQy8ChwM/84f/Ukl16I7H2h596ZuizBXwnxxJoDjHguJOPDtmCNhHz+X9jcI6tDm7b2/bJuBW2T6Rs+JmM6CqvJ1kaIvY28txWooz8cT3tGiYZrLbMrVfktnxodqE2mbgL/+LJJ+djwl+0k3+2opdrMFD2JXLEPgnsIHjJO1ltTuaBCCmhJaprXNhL76i',
        // can be sent to use traditional API without code grant
});


const getTime = () => {
    var dt = new Date();
    return dt.toLocaleDateString()+" "+dt.toLocaleTimeString();
}

(async function main() {
    // console.log(JSON.stringify(eBay.authNAuth));
    // console.log(getTime());
    eBay.trading.GetMyMessages({
        Folder: 0,
        DetailLevel: 'ReturnHeaders'
    })
    .then(result => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(e => {
        console.error(e);
    });
})();

