export class LayoutController {

    constructor(private $mdBottomSheet:ng.material.IBottomSheetService,
                private $q:ng.IQService,
                private $mdSidenav:ng.material.ISidenavService) {
    }

    public toggleList() {
        this.$mdSidenav('left').toggle();
    }
}