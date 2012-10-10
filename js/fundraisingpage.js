(function() {
    "use strict";
    var app = WinJS.Application;
    var applicationData = Windows.Storage.ApplicationData.current;
    
    var fundraisingPage = WinJS.UI.Pages.define("/html/fundraisingpage.html", {
        ready: function (element, options) {
            var pageUrl = options;
            JustGivingWinJS.GetFundraisingPage(pageUrl)
                .then(function (data) {
                    var page = JustGivingWinJS.PageObjectFromResponse(data);
                    WinJS.Namespace.define("MediaList", imagesList(page.media.images));
                    element.querySelector(".pageTitle").textContent = page.title;
                    JustGivingWinJS.DisplayFundraisingPageDetails(data, 'fundraising-page', 'fundraising-page-details');
                    var imagesListView = document.getElementById('gallery-listview');
                    imagesListView.winControl.itemTemplate = imageGalleryTemplate;

                    JustGivingWinJS.DonationForPage(pageUrl)
                        .then(function(response){ 
                            var donationsList = JSON.parse(response.responseText);
                            document.getElementById('current-page').innerText = "Page " + donationsList.pagination.pageNumber + ' of ' + donationsList.pagination.totalPages;
                            WinJS.Namespace.define("Donations", donations(donationsList.donations));
                        })
                        .done(function () {
                            var donationsListView = document.getElementById('donations-listview');
                            donationsListView.winControl.itemDataSource = Donations.List.dataSource;
                        });
                });
        }
    });
    
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


    var donations = function (donationItems) {
        var list = new WinJS.Binding.List();
        donationItems.forEach(function (donation) {
            var dateFormat = Windows.Globalization.DateTimeFormatting.DateTimeFormatter.shortDate;
            donation.DonationDate = dateFormat.format(new Date(parseInt(donation.donationDate.substr(6))));
            if (!donation.image) {
                donation.image = 'facebook-avatar.gif';
            }
            donation.imageUrl = 'http://www.justgiving.com/content/images/graphics/icons/avatars/' + donation.image;
            var currencyFormatter = Windows.Globalization.NumberFormatting.CurrencyFormatter("GBP");
            donation.AmountFormatted = currencyFormatter.format(donation.amount);
            list.dataSource.insertAtEnd(null, donation);
        });

        return {
            List: list
        };
    };
    
}());