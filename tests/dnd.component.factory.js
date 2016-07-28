"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var dnd_draggable_1 = require('../src/dnd.draggable');
var dnd_droppable_1 = require('../src/dnd.droppable');
var dnd_sortable_1 = require('../src/dnd.sortable');
function triggerEvent(elem, eventName, eventType) {
    var event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}
exports.triggerEvent = triggerEvent;
var Container = (function () {
    function Container() {
        this.dragOne = new core_1.EventEmitter();
        this.dragTwo = new core_1.EventEmitter();
        this.dragOneTwo = new core_1.EventEmitter();
        this.dropOne = new core_1.EventEmitter();
        this.dropTwo = new core_1.EventEmitter();
        this.dropOneTwo = new core_1.EventEmitter();
    }
    Container.prototype.dragOneSuccessCallback = function ($event) {
        this.dragOne.emit($event);
    };
    Container.prototype.dragTwoSuccessCallback = function ($event) {
        this.dragOne.emit($event);
    };
    Container.prototype.dragOneTwoSuccessCallback = function ($event) {
        this.dragOneTwo.emit($event);
    };
    Container.prototype.dropOneSuccessCallback = function ($event) {
        this.dropOne.emit($event);
    };
    Container.prototype.dropTwoSuccessCallback = function ($event) {
        this.dropTwo.emit($event);
    };
    Container.prototype.dropOneTwoSuccessCallback = function ($event) {
        this.dropOneTwo.emit($event);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dragOne", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dragTwo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dragOneTwo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dropOne", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dropTwo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container.prototype, "dropOneTwo", void 0);
    Container = __decorate([
        core_1.Component({
            selector: 'container',
            template: "\n<div id='dragIdOne' dnd-draggable [dropZones]=\"['zone-one']\" (onDragSuccess)=\"dragOneSuccessCallback($event)\"></div>\n<div id='dragIdTwo' dnd-draggable [dropZones]=\"['zone-two']\" (onDragSuccess)=\"dragTwoSuccessCallback($event)\"></div>\n<div id='dragIdOneTwo' dnd-draggable [dropZones]=\"['zone-one', 'zone-two']\" (onDragSuccess)=\"dragOneTwoSuccessCallback($event)\"></div>\n\n<div id='dropIdOne' dnd-droppable [dropZones]=\"['zone-one']\" (onDropSuccess)=\"dropOneSuccessCallback($event)\"></div>\n<div id='dropIdTwo' dnd-droppable [dropZones]=\"['zone-two']\" (onDropSuccess)=\"dropTwoSuccessCallback($event)\"></div>\n<div id='dropIdOneTwo' dnd-droppable [dropZones]=\"['zone-one', 'zone-two']\" (onDropSuccess)=\"dropOneTwoSuccessCallback($event)\"></div>\n",
            directives: [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Container);
    return Container;
}());
exports.Container = Container;
var Container2 = (function () {
    function Container2() {
        this.dragEnabled = true;
        this.dragData = "Hello World at " + new Date().toString();
        this.drag = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
    }
    Container2.prototype.dragSuccessCallback = function ($event) {
        this.drag.emit($event);
    };
    Container2.prototype.dropSuccessCallback = function ($event) {
        this.drop.emit($event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Container2.prototype, "dragEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Container2.prototype, "dragData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container2.prototype, "drag", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Container2.prototype, "drop", void 0);
    Container2 = __decorate([
        core_1.Component({
            selector: 'container2',
            template: "\n<div id='dragId' dnd-draggable [dragEnabled]=\"dragEnabled\" [dragData]=\"dragData\" [dropZones]=\"['test1']\" (onDragSuccess)=\"dragSuccessCallback($event)\"></div>\n<div id='dropId' dnd-droppable [dropZones]=\"['test1']\" (onDropSuccess)=\"dropSuccessCallback($event)\"></div>\n",
            directives: [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Container2);
    return Container2;
}());
exports.Container2 = Container2;
var Container3 = (function () {
    function Container3() {
        this.sortableList = [];
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Container3.prototype, "sortableList", void 0);
    Container3 = __decorate([
        core_1.Component({
            selector: 'container3',
            template: "\n<div>\n    <ul class=\"list-group\" dnd-sortable-container [sortableData]=\"sortableList\">\n        <li *ngFor=\"let item of sortableList; let i = index\" dnd-sortable [sortableIndex]=\"i\">{{item}}</li>\n    </ul>\n</div>\n",
            directives: [dnd_sortable_1.SortableContainer, dnd_sortable_1.SortableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Container3);
    return Container3;
}());
exports.Container3 = Container3;
var Container4 = (function () {
    function Container4() {
        this.singleList = [];
        this.multiOneList = [];
        this.multiTwoList = [];
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Container4.prototype, "singleList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Container4.prototype, "multiOneList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Container4.prototype, "multiTwoList", void 0);
    Container4 = __decorate([
        core_1.Component({
            selector: 'container4',
            template: "\n<div>\n    <div id='single'>\n        <ul class=\"list-group\" dnd-sortable-container [sortableData]=\"singleList\">\n            <li *ngFor=\"let item of singleList; let i = index\" dnd-sortable [sortableIndex]=\"i\">{{item}}</li>\n        </ul>\n    </div>\n    <div id='multiOne' dnd-sortable-container [dropZones]=\"['multiList']\" [sortableData]=\"multiOneList\">\n        <ul class=\"list-group\" >\n            <li *ngFor=\"let item of multiOneList; let i = index\" dnd-sortable [sortableIndex]=\"i\">{{item}}</li>\n        </ul>\n    </div>\n    <div id='multiTwo' dnd-sortable-container [dropZones]=\"['multiList']\" [sortableData]=\"multiTwoList\">\n        <ul class=\"list-group\" >\n            <li *ngFor=\"let item of multiTwoList; let i = index\" dnd-sortable [sortableIndex]=\"i\">{{item}}</li>\n        </ul>\n    </div>\n</div>\n",
            directives: [dnd_sortable_1.SortableContainer, dnd_sortable_1.SortableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Container4);
    return Container4;
}());
exports.Container4 = Container4;
//# sourceMappingURL=dnd.component.factory.js.map