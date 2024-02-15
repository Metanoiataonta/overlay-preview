export type ToastType = 'success' | 'error' | 'warning' | 'info';

export class ToastModel {
    constructor(public text: string, public type: ToastType) {
    }
}
