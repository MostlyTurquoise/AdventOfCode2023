var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Day_runTask1, _Day_runTask2;
class Day {
    constructor(inname, indaynum, inrun1, inrun2) {
        _Day_runTask1.set(this, void 0);
        _Day_runTask2.set(this, void 0);
        this.name = inname;
        this.dayNumber = indaynum;
        __classPrivateFieldSet(this, _Day_runTask1, inrun1, "f");
        __classPrivateFieldSet(this, _Day_runTask2, inrun2, "f");
    }
    run(task) {
        if (task == 1) {
            return __classPrivateFieldGet(this, _Day_runTask1, "f").call(this);
        }
        else if (task == 2 && __classPrivateFieldGet(this, _Day_runTask2, "f")) {
            return __classPrivateFieldGet(this, _Day_runTask2, "f").call(this);
        }
        else {
            throw new Error("Not a valid task :(");
        }
    }
    get stars() {
        if (__classPrivateFieldGet(this, _Day_runTask1, "f") && __classPrivateFieldGet(this, _Day_runTask2, "f")) {
            return "**";
        }
        else if (__classPrivateFieldGet(this, _Day_runTask1, "f") || __classPrivateFieldGet(this, _Day_runTask2, "f")) {
            return "*-";
        }
        else {
            return "--";
        }
    }
}
_Day_runTask1 = new WeakMap(), _Day_runTask2 = new WeakMap();
export default Day;
//# sourceMappingURL=export.js.map