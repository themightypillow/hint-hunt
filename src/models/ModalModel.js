import { configure, observable, action } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class ModalModel {
  @observable visible = false;
  @observable heading = "";
  @observable loading = false;
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
}

export default ModalModel;