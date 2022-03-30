const version = "1.0";
const debug = true;

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const config = require("./config.json");



const EbayAuthToken = require('ebay-oauth-nodejs-client');
const axios = require('axios');
const FormData = require('form-data'); 



function getDateTime(){
    var dt = new Date();
    return dt.toLocaleDateString()+" "+dt.toLocaleTimeString();
}

(async function main() {
if (debug) console.log(">main version = "+version, config, getDateTime());

    var t0 = new Date().getTime();
    var url, options, data, response;
    
    const EBAY_MODE = (config.sandbox) ? 'SANDBOX'  : 'PRODUCTION';
    
    const ebayAuthToken = new EbayAuthToken({
        filePath: './ebay.json' 
    });
/*    
   const tokenText = await ebayAuthToken.getApplicationToken('SANDBOX');
   var token = JSON.parse(tokenText);   
   await fsp.writeFile("./token_full.txt", token.access_token);
*/   
   
   const api_url = (config.sandbox) ? config.sandbox_api : config.production_api;
   
   url = api_url + "/sell/feed/v1/task";
   data = {
        "schemaVersion": "1.0",
        "feedType": "FX_LISTING"
    };
    
    options = {
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "Authorization": "Bearer "+config.token,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
        }
    };
    
    console.log("calling createTask....", url, data, options);
    try {
        response = await axios.post(url, data, options);

        console.log("createTask OK status = "+response.status, response.data, response.headers);
        if (response.status != 202){
            await fsp.writeFile("./error.txt", response.status +"\n"+JSON.stringify(response.headers));
            process.exit();
        }
        var ar = response.headers.location.split("/");
        var task_id = ar[ar.length - 1];
        console.log("task_id = "+task_id);
        
        // upload file
        url = api_url + "/sell/feed/v1/task/"+task_id+"/upload_file";        
        
        const form = new FormData();
        const filename = path.basename(config.import_file);
        form.append('fileName', filename);
        form.append('name', 'file');
        form.append('file', fs.readFileSync(config.import_file), filename);
        form.append('type', 'form-data');

        options = {
          headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "Authorization": "Bearer "+config.token,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
            ...form.getHeaders(),
          },
        };

        console.log("calling uploadFile....", options, filename, config.import_file);
        
        response = await axios.post(url, form.getBuffer(), options);        

        console.log("uploadFile OK status = "+response.status, response.data, response.headers);
        

    } catch(e){
            await fsp.writeFile("./error.txt", "ERROR"+e.message);
            process.exit();
    }
    
  
    //const token = await ebayAuthToken.getApplicationToken(EBAY_MODE);
/*    
    const scopes = ["sell.inventory","sell.fulfillment","sell.marketing","commerce.catalog.readonly","sell.analytics.readonly"];
    const authUrl = await ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes);
    console.log(authUrl);
    
    await fsp.writeFile("./auth_url.txt", authUrl);
*/    
    
if (debug) console.log("<done\nElapsed time, sec: ", (new Date().getTime() - t0) / 1000.0, getDateTime());    
    process.exit();
    
})();        