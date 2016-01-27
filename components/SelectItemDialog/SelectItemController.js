/**
 * Created by Abel on 2016. 01. 27..
 */
var SelectItemController = (function () {
    function SelectItemController($mdDialog, title, items) {
        this.$mdDialog = $mdDialog;
        this.title = title;
        this.items = items;
    }
    SelectItemController.prototype.selectItem = function (item) {
        this.$mdDialog.hide(item);
    };
    return SelectItemController;
})();
exports.SelectItemController = SelectItemController;
var Item = (function () {
    function Item() {
    }
    return Item;
})();
exports.Item = Item;
//# sourceMappingURL=SelectItemController.js.map