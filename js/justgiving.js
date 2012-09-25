"use strict";

var JustGivingWinJS = JustGivingWinJS || {};

JustGivingWinJS.ApiKey = 'e682f19f';

JustGivingWinJS.GetFundraisingPage = function (pageShortUrl) {
    var url = 'https://api.justgiving.com/' + JustGivingWinJS.ApiKey + '/v1/fundraising/pages/' + pageShortUrl;
    return WinJS.xhr({ url: url, headers: { 'content-type': 'application/json' } });
};

JustGivingWinJS.DisplayFundraisingPageDetails = function (data) {
    var template = document.getElementById('fundraising-page');
    var renderElement = document.getElementById('fundraising-page-details');
    var page = JSON.parse(data.responseText);
    page.CharityLogoUrl = 'http://www.justgiving.com/Utils/Imaging.ashx?width=120&imageType=charitybrandinglogo&img=' + page.charity.logoUrl;
    template.winControl.render(page, renderElement);
};