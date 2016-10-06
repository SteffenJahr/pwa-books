import {Component} from '@angular/core';

@Component({
    moduleId: __moduleName,
    selector: 'navigation',
    templateUrl: 'navigation.html'
})
export class NavigationComponent {
    public menuVisible: boolean;

    public toggleMenu(): void {
        this.menuVisible = !this.menuVisible;
    }
}
