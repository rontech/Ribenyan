//$('#example').dataTable();
//$('.datatable').dataTable({"sPaginationType": "bs_normal"});
//$('.datatable').dataTable({"sPaginationType": "bs_two_button"});
//$('.datatable').dataTable({"sPaginationType": "bs_four_button"});
//$('.datatable').dataTable({"sPaginationType": "bs_full"});
//i18n.setLanguage('zh');

var checkOrX = function (value) {
    var html;
    // first, normalize the value to a canonical interpretation
    if (typeof value === 'boolean')
      value = {
        support: value
      };

    if (value === null || value === undefined) {
      html = '<span style="color: orange; font-weight: bold">?</span>';
    } else {
      html = '<span style="color: lightblue">' + value + '</span>';
    }
    return new Spacebars.SafeString(html);
  };


  Template.featureComparison.helpers({
    tables : function () {
      return NewsInfo.find();
    },

    tableSettings : function () {
      return {
        rowsPerPage: 10,
        showNavigation: 'auto',
        showColumnToggles: false,
        fields: [
          {
            key: 'title',
            label: '标题',
            fn: function (name,object) {
             var html = '<a href="/manage/newslist/' + object._id + '">' + name + '</a>';
              return new Spacebars.SafeString(html);
            }
          },
//        { key: 'multisort', label: 'Multi-column sorting', fn: checkOrX },
//        { key: 'pages', label: 'Pagination', fn: checkOrX },
//        { key: 'filter', label: 'Filtering/Search', fn: checkOrX },
//        { key: 'resize', label: 'Resizable Columns', fn: checkOrX },
//        { key: 'edit', label: 'Inline Editing', fn: checkOrX },
//        { key: 'responsive', label: 'Mobile/Responsive', fn: checkOrX },
//        { key: 'i18n', label: 'Internationalization', fn: checkOrX, hidden: true },
//        { key: 'keyboard', label: 'Keyboard navigation', fn: checkOrX, hidden: true },
//        { key: 'plugins', label: 'Plugins', fn: checkOrX, hidden: true },
//        { key: 'meteor', label: 'Meteor Integration', fn: checkOrX, hidden: true },
          { key: 'secondTitle', label: '副标题', fn: checkOrX}
        ]
      };
    }
  });