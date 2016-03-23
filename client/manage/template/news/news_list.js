i18n.setLanguage('zh');
Template.newsList.rendered = function() {
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

//显示状态
var delField = function (value) {
  var html;
  if (value === null || value === undefined) {
    html = '<span style="color: orange; font-weight: bold"></span>';
  } else {
      switch (value){
        case 1:
            value = "正常";
            break;
        case 2:
            value = "未发表";
            break;
        case 0:
            value = "已删除";
            break;
      }
      html = '<span style="color: ">' + value + '</span>';
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
          headerClass: '',
          cellClass:'',
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
        { key: 'secondTitle', label: '副标题', fn: Common},
        { key: 'introduce', label: '简介', fn: Common},
        { key: 'updateTime', fn: Common, sortOrder: 0, sortDirection: 'descending',hidden: true},
        { key: 'isVaild', label: '状态',headerClass: '',headerClass:'text-nowrap', fn: delField}
      ]
    };
  }
});