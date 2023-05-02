
let price=0.00;
let gbl_ticker_name , gbl_ticker_short_code;
$(".onclick_ticker_name").on('click', function(){
    const ticker_name = $(this).attr('data-id1');
    const ticker_short_code = $(this).attr('data-id2');
    const ticker_full_name = $(this).attr('data-id3');
    var modal = document.getElementById("myModal");
    $(".ticker_img").attr('src' , 'images/'+ticker_name+".png");
    $("#invest_AMT").val("");
    $("#converted_ticker").val("");
    modal.style.display = "none";
    $('.dropdown ul > li').each(function(){
        var text = $(this).attr('data-id3');
        var text_img = $(this).attr('data-id1');
        if(text == ticker_full_name){
            $(this).html( '<img style="width: 4%;" src="images/'+ticker_name+'.png" /><span style="float: right;color: green;" class="material-symbols-outlined">check</span> ' + ticker_full_name);
        }else{
            $(this).html( '<img style="width: 4%;" src="images/'+text_img+'.png" />' + text)
        }
        //(text.toLowerCase().indexOf(ticker_full_name.toLowerCase()) > -1) ? $(this).innerText(ticker_full_name +'<span style="float: right;color: green;" class="material-symbols-outlined">check</span>') : $(this).innerText(ticker_full_name);         
    });
    
    $("#myBtn").val(ticker_full_name);
    callTicker(ticker_name,ticker_short_code);
});


function callTicker(ticker_name,ticker_short_code){
    // document.querySelector(
    //     "body").style.visibility = "hidden";

    //   document.querySelector(
    //     "#spinner").style.visibility = "visible";

    document.getElementsByClassName("loader")[0].style.display = "block";
    $("#ticker_short_code").html(ticker_short_code);
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/'+ticker_name+'@trade');
    //let ws = new WebSocket('wss://api.binance.com:9443/api/v3/ticker/price?symbol=BTCUSDT');
    const stockPriceElement = document.getElementById('stock-price');

    ws.onmessage = (event) => {
       const stockObject = JSON.parse(event.data);
       price  = parseFloat(stockObject.p) * 80;
       price = parseFloat(price).toFixed(2);
       stockPriceElement.innerText = price;
        //console.log(event.data);
        ws.close();
        // document.querySelector(
        //     "body").style.visibility = "visible";
            
        //   document.querySelector(
        //     "#spinner").style.visibility = "hidden";
        document.getElementsByClassName("loader")[0].style.display = "none";
    }
}
gbl_ticker_name = "ethusdt";
gbl_ticker_short_code = "ETH";

callTicker(gbl_ticker_name,gbl_ticker_short_code)


$("#invest_AMT").on('keyup',function(){



    let invest_AMT = $("#invest_AMT").val();
    let calculated_ticker_value =  (parseFloat(invest_AMT)) /  parseFloat(price)
    if(isNaN(parseFloat(calculated_ticker_value))){
        $("#converted_ticker").val("");
    }else{
        $("#converted_ticker").val(parseFloat(calculated_ticker_value).toFixed(2)); 
    }

});



function filter(){
    var valThis = $('#txtSearchValue').val();
    $('.dropdown ul > li').each(function(){
     var text = $(this).attr('data-id3');
        (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();         
   });
  };
