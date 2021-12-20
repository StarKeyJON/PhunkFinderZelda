let axios = require('axios');
let {RateLimit} = require('async-sema');

var fs = require('fs');

let id = 0;
const phunkData = [];
const lim = RateLimit(100);

const options = {
    method: 'GET',
    url: `https://ethereum-api.rarible.org/v0.1/nft/items/0xf07468ead8cf26c752c676e43c814fee9c8cf402:${id}/meta`,
    headers: {
        'content-type': 'application/json'
    }
};

const fetch = async () => {
    for (let i = 0; i < 1; i++) {
        await lim();axios
            .request(options)
            .then(response => {
                // const data = response.data;
                // if (data.id.length === 3) {
                //     data.id = ('0' + data.id)
                // } else if (data.id === 2) {
                //     data.id = ('00' + data.id)
                // } else if (data.id === 1) {
                //     data.id = ('000' + data.id)
                // }
                // for (var i = 1; i < phunkRank.length; i++) {
                //     if (phunkRank[i][" id"].slice(0, 4) === (data.id)) {
                //         data.rank = phunkRank[i]['ranking']
                //     }
                // }
                // console.log(`caught Phunk #${response}`)
                phunkData.push(response)
            })
            .catch(error => {
                console.error(error);
                // fs.writeFile("phunkData.json", 
                //     JSON.stringify(phunkData), 
                
                //     function (err) 
                // {
                //     if (err) {
                //         console.log(err);
                        
                //     }
                // });
            })
        }
    // fs.writeFile('finishedPhunkData.json',
    // JSON.stringify(phunkData),function (err) 
    // {
    //     if (err) {
    //         console.log(err);
            
    //     }
    // })
    console.log(phunkData)
};

fetch();