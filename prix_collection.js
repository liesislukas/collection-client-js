var prix = {
    send_event: function(data) {
        this._prepare(data).forEach(function(element){
            var r = new XMLHttpRequest();
            r.onreadystatechange = function () {
                if (r.responseText) {
                    console.log(r.responseText);
                }
            };
            r.open("POST", "https://collection.api.prix.ai:8080/v1/events", true);
            r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            r.send(JSON.stringify(element));
        });
    },
    _prepare: function(data) {
        if (data.constructor !== Array) {
            data = [data];
        }
        return data.map(function(element){
            return {
                type: element.type,
                occurred: new Date().toISOString(),
                data: {
                    merchant: element.merchant,
                    product: element.product,
                    channel: element.channel,
                    price: element.price,
                }
            }
        });
    }
}
