i18n.setLanguage('zh');
Template.adListTable.rendered = function() {
   var tmp =   sessionStorage.getItem('login_user');//Session.get("login_user");
   console.log(tmp);
   if(tmp==null){
      Router.go("/managelogin");
   }
}
//通用显示
var Common = function (value) {
  var html;
  // first, normalize the value to a canonical interpretation
  if (typeof value === 'boolean')
    value = {
      support: value
    };

  if (value === null || value === undefined) {
    html = '<span style="color: orange; font-weight: bold">?</span>';
  } else {
    html = '<span>' + value + '</span>';
  }
  return new Spacebars.SafeString(html);
};

Template.adListTable.helpers({
  adTables : function () {
    return AdInfo.find();
  },
  tableSettings : function () {
    return {
      rowsPerPage: 10,
      showNavigation: 'auto',
      showColumnToggles: false,
      fields: [
        {
          key: 'title',
          label: '名称',
          headerClass: '',
          cellClass:'',
          fn: function (name,object) {
           var html = '<a href="/manage/adview/' + object._id + '">' + name + '</a>';
            return new Spacebars.SafeString(html);
          }
        },
        {
          key: '',
          label: '',
          sortable: false,
          headerClass: 'span1',
          fn: function (name,object) {
           var html = '<div class="text-right"><a class="btn btn-info" href="/manage/adlist/' + object._id + '">编辑</a></div>';
            return new Spacebars.SafeString(html);
          }
        },
        { key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true}
//        { key: 'multisort', label: 'Multi-column sorting', fn: checkOrX },
//        { key: 'pages', label: 'Pagination', fn: checkOrX },
//        { key: 'filter', label: 'Filtering/Search', fn: checkOrX },
//        { key: 'resize', label: 'Resizable Columns', fn: checkOrX },
//        { key: 'edit', label: 'Inline Editing', fn: Common },
//        { key: 'responsive', label: 'Mobile/Responsive', fn: Common },
//        { key: 'i18n', label: 'Internationalization', fn: checkOrX, hidden: true },
//        { key: 'keyboard', label: 'Keyboard navigation', fn: checkOrX, hidden: true },
//        { key: 'plugins', label: 'Plugins', fn: checkOrX, hidden: true },
//        { key: 'meteor', label: 'Meteor Integration', fn: checkOrX, hidden: true },
          // { key: 'introduce', label: '简介', fn: Common},
          // { key: 'content', label: '内容', fn: Common}
      ]
    };
  }
});