import { configure, observable, action } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class ModalModel {

  @observable visible = false;

  @observable heading = "";

  @observable loading = false;

  // Date object once set
  @observable date = null;

  @observable buttonDisabled = false;

  @action hide = () => {
    this.visible = false;
  };

  @action hideLoading = () => {
    this.loading = false;
  };

  @action setHeading = (title) => {
    this.heading = `${this.date.toDateString()} - ${title}`;
  };

  // Only runs after the user finishes/wins a word search
  @action.bound showCalendar = () => {  
    this.visible = true;
    this.heading = "Choose a Date";
    this.loading = false;
    this.date = null;
    this.buttonDisabled = true;
    
    // 'reset' the animated win screen so that it can be animated again the future
    let animateScreen = document.querySelector(".hinthunt_animate");
    setTimeout(() => animateScreen.classList.remove("hinthunt_animate-on", "hinthunt_animate-visible"), 500);
  }
}

export default ModalModel;