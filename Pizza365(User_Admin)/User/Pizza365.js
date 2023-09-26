var gSelectedMenuStructure = {
    menuName: "",
    duongKinhCM: 0,
    suonNuong: 0,
    saladGr: 0,
    drink: 0,
    priceVND: 0,
};

var gInpName = document.getElementById("inputName");
var gInpEmail = document.getElementById("inputEmail");
var gInpSoDienThoai = document.getElementById("inputPhoneNumber");
var gInpDiaChi = document.getElementById("inputDiaChi");
var gInpMessage = document.getElementById("inputMessage");
var gInpVoucher = document.getElementById("inputVoucher");

var gSelectedPizzaType = "..."
var gDiscountVouchers = [
    { voucherID: "A1", percentDiscount: 20 },   // mã giảm giá là A1, phần trăm giảm giá 20%
    { voucherID: "A2", percentDiscount: 10 },
    { voucherID: "A3", percentDiscount: 5 },
    { voucherID: "A4", percentDiscount: 30 },
    { voucherID: "A5", percentDiscount: 20 },
    { voucherID: "B1", percentDiscount: 25 },
    { voucherID: "B2", percentDiscount: 15 },
    { voucherID: "B3", percentDiscount: 5 },
    { voucherID: "B4", percentDiscount: 30 },
    { voucherID: "B5", percentDiscount: 40 }
];

function findVoucherPrice() {
    var gREQUEST_STATUS_OK = 200;
    var gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
    var vPriceVND = gSelectedMenuStructure.priceVND;
    var vDiscount = 0;
    var vVoucher = gInpVoucher.value;
    if (vVoucher.trim() == "") {
        return vPriceVND;
    }
    var vXmlHttp = new XMLHttpRequest();

    for (var bVoucherIdx = 0; bVoucherIdx < gDiscountVouchers.length; bVoucherIdx++) {
        if (vVoucher.trim() === gDiscountVouchers[bVoucherIdx].voucherID) {
            vDiscount = gDiscountVouchers[bVoucherIdx].percentDiscount;
            return vPriceVND * (100 - vDiscount) / 100;
        }
    }
    vXmlHttp.open("GET", "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + vVoucher, false);
    vXmlHttp.send();
    var vVoucherObj = JSON.parse(vXmlHttp.responseText); 
    if(vXmlHttp.readyState === gREQUEST_READY_STATUS_FINISH_AND_OK && vXmlHttp.status === gREQUEST_STATUS_OK) {
        var vDiscount = Number(vVoucherObj.phanTramGiamGia); 
        vPriceVND = vPriceVND * (100 - vDiscount) / 100; 
    }else {
        vPriceVND = gSelectedMenuStructure.priceVND;
    }
    return vPriceVND;
}

function findDiscount() {
    var gREQUEST_STATUS_OK = 200;
    var gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
    var vDiscount; 
    var vVoucher = gInpVoucher.value;
    if (vVoucher.trim() == "") {
        return 0;
    }
    var gXmlHttp = new XMLHttpRequest();
    gXmlHttp.open("GET", "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + vVoucher, false);
    gXmlHttp.send();
    var vVoucherObj = JSON.parse(gXmlHttp.responseText); 
    if(gXmlHttp.readyState === gREQUEST_READY_STATUS_FINISH_AND_OK && gXmlHttp.status === gREQUEST_STATUS_OK) {
        vDiscount = Number(vVoucherObj.phanTramGiamGia); 
    }else {
        vDiscount = 0;
    }
    return vDiscount; 
}

function findVoucherCode() {
    var gREQUEST_STATUS_OK = 200;
    var gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
    var vVoucher = gInpVoucher.value;
    if (vVoucher.trim() == "") {
        return ""
    }
    for (var bVoucherIdx = 0; bVoucherIdx < gDiscountVouchers.length; bVoucherIdx++) {
        if (vVoucher.trim() === gDiscountVouchers[bVoucherIdx].voucherID) {
            return gDiscountVouchers[bVoucherIdx].voucherID;
        }
    }
    var gXmlHttp = new XMLHttpRequest();
    gXmlHttp.open("GET", "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + vVoucher, false);
    gXmlHttp.send();
    var vVoucherObj = JSON.parse(gXmlHttp.responseText); 
    if(gXmlHttp.readyState === gREQUEST_READY_STATUS_FINISH_AND_OK && gXmlHttp.status === gREQUEST_STATUS_OK) {
        vVoucher = vVoucherObj.maVoucher; 
    }else {
        vVoucher = ""; 
    }
    return vVoucher; 
}



function onMediumComboClick() {
    gMediumCombo.className = "btn btn-warning";
    gSmallCombo.className = "btn btn-success";
    gLargeCombo.className = "btn btn-success";

    gSelectedMenuStructure.menuName = "M";
    gSelectedMenuStructure.duongKinhCM = 25;
    gSelectedMenuStructure.suonNuong = 4;
    gSelectedMenuStructure.saladGr = 300;
    gSelectedMenuStructure.drink = 3;
    gSelectedMenuStructure.priceVND = 200000;
    displayInConsoleLog();
}

function onSmallComboClick() {
    gMediumCombo.className = "btn btn-success";
    gSmallCombo.className = " btn btn-warning";
    gLargeCombo.className = "btn btn-success";

    gSelectedMenuStructure.menuName = "S";
    gSelectedMenuStructure.duongKinhCM = 20;
    gSelectedMenuStructure.suonNuong = 2;
    gSelectedMenuStructure.saladGr = 200;
    gSelectedMenuStructure.drink = 2;
    gSelectedMenuStructure.priceVND = 150000;
    displayInConsoleLog();
}

function onLargeComboClick() {
    gMediumCombo.className = "btn btn-success";
    gSmallCombo.className = " btn btn-success";
    gLargeCombo.className = "btn btn-warning";

    gSelectedMenuStructure.menuName = "L";
    gSelectedMenuStructure.duongKinhCM = 30;
    gSelectedMenuStructure.suonNuong = 8;
    gSelectedMenuStructure.saladGr = 500;
    gSelectedMenuStructure.drink = 4;
    gSelectedMenuStructure.priceVND = 250000;
    displayInConsoleLog();
}

function displayInConsoleLog() {
    console.log("COMBO SELECTED: ");
    console.log("Kích cỡ: " + gSelectedMenuStructure.menuName);
    console.log("Đường kính: " + gSelectedMenuStructure.duongKinhCM);
    console.log("Sườn nướng đi kèm: " + gSelectedMenuStructure.suonNuong);
    console.log("Salad đi kèm: " + gSelectedMenuStructure.saladGr);
    console.log("Nước ngọt kèm: " + gSelectedMenuStructure.drink);
    console.log("Giá tiền: " + gSelectedMenuStructure.priceVND + " VND");
}


function checkChoseMenu() {
    var vMenuName = gSelectedMenuStructure.menuName;
    if (gSelectedMenuStructure.menuName === "") {
        alert("BẠN CHƯA CHỌN COMBO!");
        return false;
    }
    return vMenuName.trim();
}

function checkPizzaType() {
    if (gSelectedPizzaType === "...") {
        alert("BẠN CHƯA CHỌN LOẠI PIZZA");
        return "Basic";
    }
    return gSelectedPizzaType;
}