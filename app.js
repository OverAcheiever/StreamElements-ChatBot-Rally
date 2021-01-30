let fieldData = {};
let callBack = {};
let rlyprice = "";
let rallyPriceCommandCooldown = false;
let creatorCoinSymbolCooldown = false;
let creatorCoinPriceCommandCooldown = false;
let creatorCoinCooldown = false;
let creatorCoinTransactionsCommandCooldown = false;
let creatorCoinSupportersCommandCooldown = false;
let creatorCoinSupportVolumeCommandCooldown = false;
let creatorCoinCountCommandCooldown = false;


window.addEventListener('onWidgetLoad', function(obj) {
    fieldData = obj["detail"]["fieldData"];
});

const sayMessage = (message) => {
  	let jebaitedAPIToken = fieldData.JWTToken;
    if (jebaitedAPIToken.length !== 24) return;
    fetch(`https://api.jebaited.net/botMsg/${jebaitedAPIToken}/`, {
            method: 'post',
            body: JSON.stringify({
                "message": message
            })
        })
        .catch(e => console.error(`Error sending message to chat`));
};

window.addEventListener('onEventReceived', function(obj) {
    const listener = obj.detail.listener;
    const data = obj["detail"]["event"];
    if (listener != "message") {
        return;
    }
    console.log(obj.detail.event.data.text);

    if (obj.detail.event.data.text == fieldData.rallyPriceCommand && rallyPriceCommandCooldown == false) {
        rallyPriceCommandCooldown = true;
        const Http = new XMLHttpRequest();
        Http.open("GET", "https://api.coingecko.com/api/v3/coins/rally-2?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                let data = JSON.parse(Http.responseText);
                console.log(data.market_data.current_price.usd);
                sayMessage('Rally Price: $' + String(data.market_data.current_price.usd));
                setTimeout(function(){rallyPriceCommandCooldown = false;},{rallyPriceCommandCooldown}*1000);
            }
        }
    }
    if (obj.detail.event.data.text == fieldData.creatorCoinPriceCommand && creatorCoinPriceCommandCooldown == false) {
        creatorCoinPriceCommandCooldown = true;
            const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/"+fieldData.creatorCoinSymbol+"/price");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage(String(data.symbol) + ": $" + data.priceInUSD.toString() + " RLY: " + data.priceInRLY.toString());
                    setTimeout(function(){creatorCoinPriceCommandCooldown = false;},{creatorCoinPriceCommandCooldown}*1000);
                }

            }
    }
if (obj.detail.event.data.text == fieldData.creatorCoin && creatorCoinCooldown == false) {
        creatorCoinCooldown = true;
            const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/"+fieldData.creatorCoinSymbol+"/summary");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage("Supporters - " + data.totalSupporters+', Transactions - ' + data.totalTransaction + ', Support Volume - ' + data.totalSupportVolume + ', Total Creator Coins - ' + data.totalCoins);
                    setTimeout(function(){rallyPriceCommandCooldown = false;},{rallyPriceCommandCooldown}*1000);
                }
    }
}
if (obj.detail.event.data.text == fieldData.creatorCoinSupportersCommand && creatorCoinSupportersCommandCooldown == false) {
            creatorCoinSupportersCommandCooldown = true;  
        const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/"+fieldData.creatorCoinSymbol+"/summary");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage("Total Supporters: " + data.totalSupporters.toString());
                    setTimeout(function(){creatorCoinSupportersCommandCooldown = false;},{creatorCoinSupportersCommandCooldown}*1000);
                }

            }
    }if (obj.detail.event.data.text == fieldData.creatorCoinSupportVolumeCommand && creatorCoinSupportVolumeCommandCooldown == false) {
        creatorCoinSupportVolumeCommandCooldown = true;
            const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/"+fieldData.creatorCoinSymbol+"/summary");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage("Total Support Volume: " + data.totalSupportVolume.toString());
                    setTimeout(function(){creatorCoinSupportVolumeCommandCooldown = false;},{creatorCoinSupportVolumeCommandCooldown}*1000);
                }

            }
    }
if (obj.detail.event.data.text == fieldData.creatorCoinCountCommand && creatorCoinCountCommandCooldown == false) {
    creatorCoinCountCommandCooldown = true;    
        const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/"+fieldData.creatorCoinSymbol+"/summary");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage("Total Creator Coin Count: " + data.totalCoins.toString());
                    setTimeout(function(){creatorCoinCountCommandCooldown = false;},{creatorCoinCountCommandCooldown}*1000);
                }

            }
    }
    if (obj.detail.event.data.text == fieldData.creatorCoinTransactionsCommand && creatorCoinTransactionsCommandCooldown == false) {
        creatorCoinTransactionsCommandCooldown = true;
            const Http = new XMLHttpRequest();
            Http.open("GET", "https://api.rally.io/v1/creator_coins/SKOT/summary");
            Http.send();

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    let data = JSON.parse(Http.responseText);
                    console.log(data);
                    sayMessage("Total Transactions: " + data.totalTransaction.toString());
                    setTimeout(function(){creatorCoinTransactionsCommandCooldown = false;},{creatorCoinTransactionsCommandCooldown}*1000);
                }
        }
    }
});