"use strict";

var JustGivingWinJS = JustGivingWinJS || {};

JustGivingWinJS.ApiKey = 'e682f19f';

JustGivingWinJS.GetFundraisingPage = function (pageShortUrl) {
    var url = 'https://api.justgiving.com/' + JustGivingWinJS.ApiKey + '/v1/fundraising/pages/' + pageShortUrl;
    return WinJS.xhr({ url: url, headers: { 'content-type': 'application/json' } });
};

JustGivingWinJS.DisplayFundraisingPageDetails = function (data, templateId, elementId) {
    var template = document.getElementById(templateId);
    var renderElement = elementId ? document.getElementById(elementId) : document.createElement('div');
    var page = JustGivingWinJS.PageObjectFromResponse(data);
    template.winControl.render(page, renderElement);
    return renderElement;
};

JustGivingWinJS.PageObjectFromResponse = function(data) {
    var page = JSON.parse(data.responseText);
    page.CharityLogoUrl = JustGivingWinJS.ImageUrlFromImage(page.charity.logoUrl, 'charity');
    page.PageImage = JustGivingWinJS.ImageUrlFromImage(page.media.images[0].url, 'media');
    page.Target = JustGivingWinJS.FormatCurrency(page.fundraisingTarget);
    var totalRaised = parseFloat(page.totalRaisedOffline) + parseFloat(page.totalRaisedOnline) + parseFloat(page.totalRaisedSms);
    page.TotalRaised = JustGivingWinJS.FormatCurrency(totalRaised);
    return page;
};

JustGivingWinJS.FormatCurrency = function(amount) {
    var currencyFormatter = Windows.Globalization.NumberFormatting.CurrencyFormatter("GBP");
    return currencyFormatter.format(amount);
};



JustGivingWinJS.ImageUrlFromImage = function(url, imageType) {
    switch (imageType) {
    case 'charity':
        return 'http://www.justgiving.com/Utils/Imaging.ashx?width=100&imageType=charitybrandinglogo&img=' + url;
    case 'media':
        return 'http://www.justgiving.com/Utils/imaging.ashx?width=160&height=160&imageType=frpphoto&img=' + url;
    default:
        return url;
    }
};

JustGivingWinJS.DonationForPage = function (pageShortUrl, pageNumber) {
    var url = 'https://api.justgiving.com/' + JustGivingWinJS.ApiKey + '/v1/fundraising/pages/' + pageShortUrl + '/donations?pageSize=5';
    if (pageNumber) {
        url = url + '&pageNum=' + pageNumber;
    }
    return WinJS.xhr({ url: url, headers: { 'content-type': 'application/json' } });
};

