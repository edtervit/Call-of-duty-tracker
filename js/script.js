function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
    }

async function getStats(apikey, gt){
    
    
    let edData = fetch(`https://rapidapi.p.rapidapi.com/multiplayer/${gt}/xbl`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": apikey,
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
        }
        })
        .then(response => {
            let ed = response.json()
            return ed
            
        })
        .catch(err => {
            console.error(err);
        });
    
    let printData = async() => {
        let ed = await edData;
            return ed
        };
    

    let final = printData();    
    return final;
}



async function displayData(apiKey, gt, divId){

    let data = await getStats(apiKey, gt);

    console.log(data);

    function newPara(text){
        let para = document.createElement('p');
        para.innerHTML = text;
        document.getElementById(divId).appendChild(para);
    }

    //displays total kills
    const kills = `<strong>Kills: </strong> ${data.lifetime.all.properties.kills}`;
    newPara(kills);

    //displays KD
    const KD = `<strong>KD: </strong> ${data.lifetime.all.properties.kdRatio}`;
    newPara(KD);

    // displays time played 
    const timePlayed = `<strong>Playtime: </strong> ${secondsToDhms(data.lifetime.all.properties.timePlayedTotal)}`;
    newPara(timePlayed);




}

