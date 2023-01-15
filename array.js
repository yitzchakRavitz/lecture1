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
require('events').EventEmitter.defaultMaxListeners = 50;
var arr = [];
function generateList() {
    for (var index = 0; index < 50000; index++) {
        arr[index] = Math.floor(Math.random() * 50000);
    }
    console.log(arr[3000]);
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var rl, choice, choice_1, flag, index, arr2, choice_2, find, left, right, index, flag, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout, terminal: false })];
                case 1:
                    rl = _a.sent();
                    return [4 /*yield*/, rl.question("For unsorted array, press 1.\nFor sorted array, press 2.\npress 3 to exit \n")];
                case 2:
                    choice = _a.sent();
                    if (!(choice == "1")) return [3 /*break*/, 4];
                    return [4 /*yield*/, rl.question("Enter a number between 1 and 50000   ")];
                case 3:
                    choice_1 = _a.sent();
                    flag = false;
                    for (index = 0; index < arr.length; index++) {
                        if (choice_1 == arr[index]) {
                            console.log("The number " + choice_1 + " is in the array at position " + index);
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        console.log("The number is not in the array");
                    }
                    start();
                    _a.label = 4;
                case 4:
                    if (!(choice == "2")) return [3 /*break*/, 6];
                    arr2 = [];
                    arr2 = arr.sort();
                    return [4 /*yield*/, rl.question("Enter a number between 1 and 50000  ")];
                case 5:
                    choice_2 = _a.sent();
                    find = 0;
                    left = 0;
                    right = arr2.length - 1;
                    index = 0;
                    flag = false;
                    count = 0;
                    while (left < right && flag == false) {
                        count += 1;
                        index = Math.floor((left + right) / 2);
                        if (arr2[index] < choice_2) {
                            left = index;
                        }
                        if (arr2[index] > choice_2) {
                            right = index;
                        }
                        if (arr2[index] == parseInt(choice_2)) {
                            console.log("The number " + choice_2 + " is in the array at position " + index);
                            console.log("It took " + count + " tests on the array");
                            flag = true;
                        }
                        else if (index == Math.floor((left + right) / 2)) {
                            if (arr2[index + 1] == parseInt(choice_2)) {
                                console.log("The number " + choice_2 + " is in the array at position " + index);
                                console.log("It took " + count + " tests on the array");
                                flag = true;
                            }
                            left = right;
                        }
                    }
                    if (flag == false) {
                        console.log("The number is not in the array");
                        console.log("It took " + count + " tests on the array");
                    }
                    flag = false;
                    start();
                    _a.label = 6;
                case 6:
                    if (choice == "3") {
                        (0, node_process_1.exit)(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
generateList();
start();
