"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
var dnd_config_1 = require('../src/dnd.config');
var dnd_service_1 = require('../src/dnd.service');
var dnd_component_factory_1 = require('./dnd.component.factory');
function main() {
    testing_1.describe('Sortable Drag and Drop', function () {
        var componentFixture;
        var dragdropService;
        var config;
        var container;
        var sortableService;
        testing_1.beforeEachProviders(function () {
            return [
                testing_2.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
                testing_2.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
                dnd_config_1.DragDropConfig,
                dnd_service_1.DragDropService,
                dnd_service_1.DragDropSortableService
            ];
        });
        testing_1.beforeEach(testing_1.async(testing_1.inject([testing_1.TestComponentBuilder, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService], function (tcb, c, dd, ds) {
            dragdropService = dd;
            config = c;
            sortableService = ds;
            tcb.createAsync(dnd_component_factory_1.Container3)
                .then(function (cf) {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = componentFixture.componentInstance;
            });
        })));
        testing_1.it('should be defined', function () {
            testing_1.expect(componentFixture).toBeDefined();
        });
        testing_1.it('The elements of the list should be draggable', function () {
            var values = ['one', 'two', 'three', 'four', 'five', 'six'];
            container.sortableList = values;
            componentFixture.detectChanges();
            var ulElem = componentFixture.elementRef.nativeElement.querySelector('ul');
            testing_1.expect(ulElem).toBeDefined();
            testing_1.expect(ulElem.children.length).toBe(values.length);
            for (var i = 0; i < ulElem.children.length; i++) {
                var childElem = ulElem.children[i];
                testing_1.expect(childElem.attributes['draggable']).toBeTruthy();
            }
        });
        testing_1.it('It should sort in the same list', function () {
            var values = ['one', 'two', 'three', 'four'];
            container.sortableList = values;
            componentFixture.detectChanges();
            var ulElem = componentFixture.elementRef.nativeElement.querySelector('ul');
            testing_1.expect(ulElem).toBeDefined();
            testing_1.expect(ulElem.children.length).toBe(values.length);
            testing_1.expect(sortableService.sortableData).not.toBeDefined();
            testing_1.expect(sortableService.index).not.toBeDefined();
            dnd_component_factory_1.triggerEvent(ulElem.children[0], 'dragstart', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(sortableService.sortableData).toBe(values);
            testing_1.expect(sortableService.index).toBe(0);
            swap(ulElem.children, 0, 1);
            componentFixture.detectChanges();
            testing_1.expect(values[0]).toBe('two');
            testing_1.expect(ulElem.children[0].textContent).toBe('two');
            testing_1.expect(values[1]).toBe('one');
            testing_1.expect(ulElem.children[1].textContent).toBe('one');
        });
        testing_1.it('It should work with arbitrary objects', function () {
            var elemOne = document.createElement('div');
            var elemTwo = 'elemTwo';
            var elemThree = { 'key': 'value' };
            var values = [elemOne, elemTwo, elemThree];
            container.sortableList = values;
            componentFixture.detectChanges();
            var ulElem = componentFixture.elementRef.nativeElement.querySelector('ul');
            testing_1.expect(ulElem).toBeDefined();
            testing_1.expect(ulElem.children.length).toBe(values.length);
            swap(ulElem.children, 0, 1);
            testing_1.expect(values[0]).toBe(elemTwo);
            testing_1.expect(values[1]).toBe(elemOne);
            swap(ulElem.children, 1, 2);
            testing_1.expect(values[1]).toBe(elemThree);
            testing_1.expect(values[2]).toBe(elemOne);
            swap(ulElem.children, 0, 1);
            testing_1.expect(values[0]).toBe(elemThree);
            testing_1.expect(values[1]).toBe(elemTwo);
        });
    });
    testing_1.describe('Multi List Sortable Drag and Drop', function () {
        var componentFixture;
        var dragdropService;
        var config;
        var container;
        var sortableService;
        testing_1.beforeEachProviders(function () {
            return [testing_2.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, testing_2.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService];
        });
        // beforeEach(injectAsync([TestComponentBuilder, DragDropConfig, DragDropService, DragDropSortableService],
        testing_1.beforeEach(testing_1.async(testing_1.inject([testing_1.TestComponentBuilder, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService], function (tcb, c, dd, ds) {
            dragdropService = dd;
            config = c;
            sortableService = ds;
            return tcb.createAsync(dnd_component_factory_1.Container4).then(function (cf) {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = componentFixture.componentInstance;
            });
        })));
        testing_1.it('should be defined', function () {
            testing_1.expect(componentFixture).toBeDefined();
        });
        testing_1.it('It should sort in the same list', function () {
            var singleList = ['sOne', 'sTwo', 'sThree'];
            var multiOneList = ['mOne', 'mTwo', 'mThree'];
            var multiTwoList = ['mFour', 'mFive', 'mSix'];
            container.singleList = singleList;
            container.multiOneList = multiOneList;
            container.multiTwoList = multiTwoList;
            componentFixture.detectChanges();
            var divElem = componentFixture.elementRef.nativeElement.querySelector('div');
            testing_1.expect(divElem).toBeDefined();
            testing_1.expect(divElem.children.length).toBe(3);
            var singleElem = divElem.querySelector('#single ul');
            swap(singleElem.children, 0, 1);
            componentFixture.detectChanges();
            testing_1.expect(singleList[0]).toBe('sTwo');
            testing_1.expect(singleElem.children[0].textContent).toEqual('sTwo');
            testing_1.expect(singleList[1]).toBe('sOne');
            testing_1.expect(singleElem.children[1].textContent).toEqual('sOne');
            var multiOneElem = divElem.querySelector('#multiOne ul');
            swap(multiOneElem.children, 1, 2);
            componentFixture.detectChanges();
            testing_1.expect(multiOneList[1]).toBe('mThree');
            testing_1.expect(multiOneElem.children[1].textContent).toEqual('mThree');
            testing_1.expect(multiOneList[2]).toBe('mTwo');
            testing_1.expect(multiOneElem.children[2].textContent).toEqual('mTwo');
            var multiTwoElem = divElem.querySelector('#multiTwo ul');
            swap(multiTwoElem.children, 1, 2);
            componentFixture.detectChanges();
            testing_1.expect(multiTwoList[1]).toBe('mSix');
            testing_1.expect(multiTwoElem.children[1].textContent).toEqual('mSix');
            testing_1.expect(multiTwoList[2]).toBe('mFive');
            testing_1.expect(multiTwoElem.children[2].textContent).toEqual('mFive');
        });
        testing_1.it('It should be possible to move items from list one to list two', function () {
            var singleList = ['sOne', 'sTwo', 'sThree'];
            var multiOneList = ['mOne', 'mTwo', 'mThree'];
            var multiTwoList = ['mFour', 'mFive', 'mSix'];
            container.singleList = singleList;
            container.multiOneList = multiOneList;
            container.multiTwoList = multiTwoList;
            componentFixture.detectChanges();
            var divElem = componentFixture.elementRef.nativeElement.querySelector('div');
            testing_1.expect(divElem).toBeDefined();
            testing_1.expect(divElem.children.length).toBe(3);
            var multiOneElem = divElem.querySelector('#multiOne ul');
            var multiTwoElem = divElem.querySelector('#multiTwo ul');
            swapMultiple(multiOneElem.children, 0, multiTwoElem.children, 0);
            componentFixture.detectChanges();
            testing_1.expect(multiOneList.length).toBe(2);
            testing_1.expect(multiTwoList.length).toBe(4);
            testing_1.expect(multiOneList[0]).toBe('mTwo');
            testing_1.expect(multiTwoList[0]).toBe('mOne');
            testing_1.expect(multiTwoList[1]).toBe('mFour');
        });
        testing_1.it('It should not be possible to move items between lists not in the same sortable-zone', function () {
            var singleList = ['sOne', 'sTwo', 'sThree'];
            var multiOneList = ['mOne', 'mTwo', 'mThree'];
            var multiTwoList = ['mFour', 'mFive', 'mSix'];
            container.singleList = singleList;
            container.multiOneList = multiOneList;
            container.multiTwoList = multiTwoList;
            componentFixture.detectChanges();
            var divElem = componentFixture.elementRef.nativeElement.querySelector('div');
            testing_1.expect(divElem).toBeDefined();
            testing_1.expect(divElem.children.length).toBe(3);
            var singleElem = divElem.querySelector('#single ul');
            var multiOneElem = divElem.querySelector('#multiOne ul');
            swapMultiple(singleElem.children, 0, multiOneElem.children, 0);
            componentFixture.detectChanges();
            testing_1.expect(singleList.length).toBe(3);
            testing_1.expect(multiOneList.length).toBe(3);
            testing_1.expect(singleList[0]).toBe('sOne');
            testing_1.expect(multiOneList[0]).toBe('mOne');
        });
        testing_1.it('When the list is empty the parent must handle dragenter events', function () {
            var singleList = ['sOne', 'sTwo', 'sThree'];
            var multiOneList = [];
            var multiTwoList = ['mOne', 'mTwo', 'mThree', 'mFour', 'mFive', 'mSix'];
            container.singleList = singleList;
            container.multiOneList = multiOneList;
            container.multiTwoList = multiTwoList;
            componentFixture.detectChanges();
            var divElem = componentFixture.elementRef.nativeElement.querySelector('div');
            testing_1.expect(divElem).toBeDefined();
            testing_1.expect(divElem.children.length).toBe(3);
            var multiOneElem = divElem.querySelector('#multiOne');
            var multiTwoUlElem = divElem.querySelector('#multiTwo ul');
            dnd_component_factory_1.triggerEvent(multiTwoUlElem.children[3], 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(multiOneElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(multiOneList.length).toBe(1);
            testing_1.expect(multiTwoList.length).toBe(5);
            testing_1.expect(multiTwoList[3]).toBe('mFive');
            testing_1.expect(multiOneList[0]).toBe('mFour');
        });
        testing_1.it('When the list is NOT empty the parent must NOT handle dragenter events', function () {
            var singleList = ['sOne', 'sTwo', 'sThree'];
            var multiOneList = ['mOne'];
            var multiTwoList = ['mTwo', 'mThree', 'mFour', 'mFive', 'mSix'];
            container.singleList = singleList;
            container.multiOneList = multiOneList;
            container.multiTwoList = multiTwoList;
            componentFixture.detectChanges();
            var divElem = componentFixture.elementRef.nativeElement.querySelector('div');
            testing_1.expect(divElem).toBeDefined();
            testing_1.expect(divElem.children.length).toBe(3);
            var multiOneElem = divElem.querySelector('#multiOne');
            var multiTwoUlElem = divElem.querySelector('#multiTwo ul');
            dnd_component_factory_1.triggerEvent(multiTwoUlElem.children[0], 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(multiOneElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(multiOneList.length).toBe(1);
            testing_1.expect(multiTwoList.length).toBe(5);
            testing_1.expect(multiOneList[0]).toBe('mOne');
            testing_1.expect(multiTwoList[0]).toBe('mTwo');
        });
    });
}
exports.main = main;
function swap(nodes, firstNodeId, secondNodeId) {
    swapMultiple(nodes, firstNodeId, nodes, secondNodeId);
}
function swapMultiple(nodesOne, firstNodeId, nodesTwo, secondNodeId) {
    dnd_component_factory_1.triggerEvent(nodesOne[firstNodeId], 'dragstart', 'MouseEvent');
    dnd_component_factory_1.triggerEvent(nodesTwo[secondNodeId], 'dragenter', 'MouseEvent');
}
//# sourceMappingURL=dnd.sortable.spec.js.map