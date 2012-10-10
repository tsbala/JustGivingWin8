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
    return page;
};

JustGivingWinJS.ImageUrlFromImage = function(url, imageType) {
    switch (imageType) {
    case 'charity':
        return 'http://www.justgiving.com/Utils/Imaging.ashx?width=120&imageType=charitybrandinglogo&img=' + url;
    case 'media':
        return 'http://www.justgiving.com/Utils/imaging.ashx?width=65&imageType=frpphoto&img=' + url;
    default:
        return url;
    }
};

JustGivingWinJS.DonationForPage = function(pageShortUrl) {
    var url = 'https://api.justgiving.com/' + JustGivingWinJS.ApiKey + '/v1/fundraising/pages/' + pageShortUrl + '/donations?pageSize=5';
    return WinJS.xhr({ url: url, headers: { 'content-type': 'application/json' } });
};

