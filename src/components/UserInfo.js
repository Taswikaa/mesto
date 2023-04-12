export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  setUserInfo(name, job) {
    if (name) {
      this._nameSelector.textContent = name;
    }
    if (job) {
      this._jobSelector.textContent = job;
    }
  }
}