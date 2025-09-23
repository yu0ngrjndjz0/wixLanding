export class FormSpamPrevention {
  constructor() {
    window.addEventListener('pageshow', this.initializeFormHandlers, { passive: true });
  }

  private initializeFormHandlers = (): void => {
    const forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      new FormSubmitController(forms[i]);
    }
  }
}

class FormSubmitController {
  private isSubmitAllowed: boolean = true;

  constructor(form: HTMLFormElement) {
    if (!form) return;

    form.onsubmit = (): boolean => {
      if (!this.isSubmitAllowed) return false;

      this.isSubmitAllowed = false;
      return true;
    }
  }
}
