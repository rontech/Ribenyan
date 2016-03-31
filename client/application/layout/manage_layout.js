Template.manageLayout.newsPermission = function (q) {
  return sessionStorage.getItem('newsperms') === q;
} ;
Template.manageLayout.adPermission = function (q) {
  return sessionStorage.getItem('adperms') === q;
} ;
Template.manageLayout.ctrlPermission = function (q) {
  return sessionStorage.getItem('ctrlperms') === q;
} ;
