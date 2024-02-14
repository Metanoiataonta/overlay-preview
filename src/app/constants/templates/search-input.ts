export const SEARCH_INPUT_TEMPLATE = '<div class="search-input" [ngClass]="{open: isListVisible()}" (click)="toggleList()" #input>\n' +
    '    <input type="text" class="search-input__input" [ngModel]="value()"\n' +
    '           (ngModelChange)="valueChange($event)">\n' +
    '    <svg (click)=" toggleList($event)" [style.color]="list().length > 0 ? \'#A2A9B8\' : \'red\'"\n' +
    '         width="24" height="24"\n' +
    '         viewBox="0 0 24 24" stroke="currentColor" fill="none"\n' +
    '         xmlns="http://www.w3.org/2000/svg"\n' +
    '         class="search-input__chevron">\n' +
    '        <path d="M9 13L12 10L15 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '    </svg>\n' +
    '\n' +
    '</div>\n' +
    '<ng-template>\n' +
    '    <div class="search-input__wrapper">\n' +
    '        <div *ngFor="let item of list()" class="search-input__item" (click)="pickItem(item)">\n' +
    '            <div class="search-input__item-inner">\n' +
    '                {{ item }}\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</ng-template>\n';
