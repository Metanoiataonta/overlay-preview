export type IToastType = 'success' | 'error'

export class ToastModel {
    constructor(public text: string, public type: IToastType) {
    }
}
