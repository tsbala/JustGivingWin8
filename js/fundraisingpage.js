﻿(function() {
    "use strict";
    
    var fundraisingPage = WinJS.UI.Pages.define("/html/fundraisingpage.html", {
        ready: function (element, options) {
            var pageUrl = options;
            JustGivingWinJS.GetFundraisingPage(pageUrl)
                .done(function (data) {
                    var page = JustGivingWinJS.PageObjectFromResponse(data);
                    WinJS.Namespace.define("MediaList", imagesList(page.media.images));
                    document.getElementById("pageTitle").textContent = page.title;
                    JustGivingWinJS.DisplayFundraisingPageDetails(data, 'fundraising-page', 'fundraising-page-details');
                    var imagesListView = document.getElementById('gallery-listview');
                    imagesListView.winControl.itemTemplate = imageGalleryTemplate;
                    singlePageOfDonations(pageUrl);
                });
        }
    });
    
    function singlePageOfDonations(pageUrl) {
        displaySinglePageOfDonations(pageUrl);

        document.getElementsByClassName('prev-page')[0].addEventListener('click', function(e) {
            getPreviousPageOfDonations();
        });
        
        document.getElementsByClassName('next-page')[0].addEventListener('click', function (e) {
            getNextPageOfDonations();
        });
    }

    function displaySinglePageOfDonations(pageUrl, pageNumber) {
        JustGivingWinJS.DonationForPage(pageUrl, pageNumber)
            .then(function (response) {
                var donationsList = JSON.parse(response.responseText);
                WinJS.Namespace.define("Donations", donations(donationsList));
            })
            .done(function () {
                var donationsListView = document.getElementById('donations-listview');
                document.getElementById('current-page').innerText = "Page " + Donations.CurrentPageNumber + ' of ' + Donations.TotalPages;
                donationsListView.winControl.itemDataSource = Donations.List.dataSource;
            });
    }
    
    function getPreviousPageOfDonations() {
        if (Donations.CurrentPageNumber !== 1)
        {
            displaySinglePageOfDonations(Donations.PageUrl, Donations.CurrentPageNumber - 1);
        }
    }

    function getNextPageOfDonations() {
        if (Donations.CurrentPageNumber !== Donations.TotalPages)
        {
            displaySinglePageOfDonations(Donations.PageUrl, Donations.CurrentPageNumber + 1);
        }
    }
    
    function imageGalleryTemplate(imagesPromise) {
        return imagesPromise.then(function (image) {
            var template = document.getElementById('image-template');
            var renderElement = document.createElement('div');
            template.winControl.render(image.data, renderElement);
            return renderElement;
        });
    }
    
    WinJS.Namespace.define("FundraisingPage", {
        FundraisingPageControl: fundraisingPage
    });
    
    var imagesList = function (images) {
        var list = new WinJS.Binding.List();
        images.forEach(function (img) {
            img.absoluteUrl = JustGivingWinJS.ImageUrlFromImage(img.url, 'media');
            list.dataSource.insertAtEnd(null, img);
        });

        return {
            Images: list
        };
    };


    var donations = function (donationsObject) {
        var list = new WinJS.Binding.List();
        donationsObject.donations.forEach(function (donation) {
            var dateFormat = Windows.Globalization.DateTimeFormatting.DateTimeFormatter.shortDate;
            donation.DonationDate = dateFormat.format(new Date(parseInt(donation.donationDate.substr(6))));
            if (!donation.image) {
                donation.image = 'facebook-avatar.gif';
            }
            donation.AmountFormatted = JustGivingWinJS.FormatCurrency(donation.amount);
            donation.imageUrl = 'http://www.justgiving.com/content/images/graphics/icons/avatars/' + donation.image;
            list.dataSource.insertAtEnd(null, donation);
        });

        return {
            List: list,
            CurrentPageNumber: donationsObject.pagination.pageNumber,
            TotalPages: donationsObject.pagination.totalPages,
            PageUrl: donationsObject.id
        };
    };
    
}());