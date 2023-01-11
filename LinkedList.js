"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_process_1 = require("node:process");
var readline = require("node:readline/promises");
var indexd = 0;
var myNode = /** @class */ (function () {
    function myNode(data) {
        this.number = data;
        this.indexd = indexd;
        this.next = null;
        indexd = indexd + 1;
    }
    return myNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
    }
    // Adding a new node to the end of the list
    LinkedList.prototype.append = function (data) {
        var newNode = new myNode(data);
        // If the list is empty, set the new node as the head
        if (!this.head) {
            this.head = newNode;
            return;
        }
        var current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    };
    // Removing a node from the list
    LinkedList.prototype.remove = function (data) {
        if (!this.head) {
            return;
        }
        // If the head node contains the data to remove
        if (this.head.number === data) {
            this.head = this.head.next;
            return;
        }
        var current = this.head;
        while (current.next) {
            if (current.next.number === data) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    };
    // Finding a node in the list
    LinkedList.prototype.find = function (data) {
        if (!this.head) {
            return null;
        }
        var current = this.head;
        while (current) {
            if (current.number == data) {
                return current;
            }
            current = current.next;
        }
        return null;
    };
    return LinkedList;
}());
function generateList() {
    return __awaiter(this, void 0, void 0, function () {
        var myList, num, index;
        return __generator(this, function (_a) {
            myList = new LinkedList();
            num = 0;
            for (index = 0; index < 50000; index++) {
                num = Math.floor(Math.random() * 500000);
                if (index == 30000) {
                    console.log(num);
                }
                myList.append(num);
            }
            return [2 /*return*/, myList];
        });
    });
}
function start(myList) {
    return __awaiter(this, void 0, void 0, function () {
        var rl, choice, current;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout, terminal: false })];
                case 1:
                    rl = _a.sent();
                    return [4 /*yield*/, rl.question("enter a number enter \"x\" to exit  ")];
                case 2:
                    choice = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!!choice) return [3 /*break*/, 5];
                    return [4 /*yield*/, rl.question("Please enter a correct number")];
                case 4:
                    choice = _a.sent();
                    return [3 /*break*/, 3];
                case 5:
                    if (!choice.includes("x")) return [3 /*break*/, 6];
                    (0, node_process_1.exit)(0);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, myList];
                case 7:
                    current = (_a.sent()).find(choice);
                    if (current) {
                        console.log(current.number);
                        console.log(current.indexd);
                    }
                    else {
                        console.log("no!!!");
                    }
                    start(myList);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
start(generateList());
