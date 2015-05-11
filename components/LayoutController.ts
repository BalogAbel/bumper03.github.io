/**
 * Created by Balog �bel P�ter on 2015.04.08..
 */

///<reference path='../references.ts' />

module app {
    import ng = angular;


    export class LayoutController {

        constructor(private $mdBottomSheet:ng.material.MDBottomSheetService,
                    private $q:ng.IQService,
                    private $mdSidenav:ng.material.MDSidenavService) {
        }

        public toggleList() {
            this.$mdSidenav('left').toggle();
        }
    }
}