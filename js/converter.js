(function(WinJS) {
    var storyHTML = WinJS.Binding.converter(function (storyHtml) {
        return toStaticHTML(storyHtml);
    });

    WinJS.Namespace.define('JustGivingJS.Converters', {
        storyHTML: storyHTML
    });
}(WinJS));