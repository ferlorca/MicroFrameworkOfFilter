//import "filterlist.js";
//import "filters/filter.js";
//import "filters/filter-type-autocomplete.js";
//import "filters/filter-type-select.js";
//import "filters/filter-type-text.js";

filters_library = {
    init: function () {
        this.importLibraries();
    }    ,
    importLibraries: function () {
        //$(window).bind("load", function () {
            jQuery.loadScript = function (url, callback) {
                jQuery.ajax({
                    url: url,
                    dataType: 'script',
                    success: callback,
                    async: true
                });
            };
            $.loadScript('filterlist.js', function () { console.log("filterlist loaded correctly") });
            $.loadScript('filters/filters.js', function () { console.log("filters loaded correctly") });
            $.loadScript('filters/filter-type-autocomplete.js', function () { console.log("filter-autocomplete loaded correctly") });
            $.loadScript('filters/filter-type-check.js', function () { console.log("filter-check loaded correctly") });
            $.loadScript('filters/filter-type-date.js', function () { console.log("filter-date loaded correctly") });
            $.loadScript('filters/filter-type-daterange.js', function () { console.log("filter-daterange loaded correctly") });
            $.loadScript('filters/filter-type-select.js', function () { console.log("filter-select loaded correctly") });
            $.loadScript('filters/filter-type-select-multiple.js', function () { console.log("filter-select-multiple loaded correctly") });
            $.loadScript('filters/filter-type-text-ajax.js', function () { console.log("filter-text-ajax loaded correctly") });
            $.loadScript('filters/filter-type-text.js', function () { console.log("filter-text loaded correctly") });
            $.loadScript('filters/filter-type-text-multiple.js', function () { console.log("filter-text-multiple loaded correctly") });
        //});
    }
}