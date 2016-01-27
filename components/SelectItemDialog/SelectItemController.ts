/**
 * Created by Abel on 2016. 01. 27..
 */

export class SelectItemController {

    constructor(private $mdDialog:ng.material.IDialogService, private title: String, private items:Item[]) {

    }

    selectItem(item: Item) {
        this.$mdDialog.hide(item)
    }
}

export class Item {
    name:String
}