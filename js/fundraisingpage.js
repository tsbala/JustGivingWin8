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
                        .then(function(response) {
                            var donationsList = JSON.parse(response.responseText);
                            WinJS.Namespace.define("Donations", donations(donationsList.donations));
                            var donationsListView = document.getElementById('donations-listview');
                            donationsListView.winControl.itemTemplate = donationItemTemplate;
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
    
    function donationItemTemplate(donationsPromise) {
        donationsPromise.then(function(donation) {
            var template = document.getElementById('donation-template');
            var renderDiv = document.createElement('div');
            template.winControl.render(donation.data, renderDiv);
            return renderDiv;
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


    var donations = function(donations) {
        var list = new WinJS.Binding.List();
        donations.forEach(function(donation) {
            list.dataSource.insertAtEnd(donation);
        });

        return {
            List: list
        };
    };
    
}());