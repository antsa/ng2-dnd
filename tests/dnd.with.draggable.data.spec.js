"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
var dnd_config_1 = require('../src/dnd.config');
var dnd_service_1 = require('../src/dnd.service');
var dnd_component_factory_1 = require('./dnd.component.factory');
function main() {
    testing_1.describe('Drag and Drop without draggable data', function () {
        var componentFixture;
        var dragdropService;
        var config;
        var container;
        testing_1.beforeEachProviders(function () {
            return [testing_2.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, testing_2.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService];
        });
        testing_1.beforeEach(testing_1.async(testing_1.inject([testing_1.TestComponentBuilder, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService], function (tcb, c, dd) {
            dragdropService = dd;
            config = c;
            return tcb.createAsync(dnd_component_factory_1.Container2).then(function (cf) {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = componentFixture.componentInstance;
            });
        })));
        testing_1.it('should be defined', function () {
            testing_1.expect(componentFixture).toBeDefined();
        });
        testing_1.it('It should add the "draggable" attribute', function (done) {
            var dragElem = componentFixture.elementRef.nativeElement.querySelector('#dragId');
            testing_1.expect(dragElem).toBeDefined();
            testing_1.expect(dragElem.attributes['draggable']).toBeTruthy();
            done();
        });
        // it('Drag events should add/remove the draggable data to/from the DragDropService', (done:any) => {
        //     let dragElem:HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragId');
        //     expect(dragdropService.dragData).not.toBeDefined();
        //     triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        //     componentFixture.detectChanges();
        //     expect(dragdropService.dragData).toBeDefined();
        //     triggerEvent(dragElem, 'dragend', 'MouseEvent');
        //     componentFixture.detectChanges();
        //     expect(dragdropService.dragData).toBeNull();
        //     done();
        // });
        // it('Drag events should add/remove the expected classes to the target element', (done:any) => {
        //     let dragElem:HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragId');
        //     expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);
        //     triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        //     componentFixture.detectChanges();
        //     expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(true);
        //     triggerEvent(dragElem, 'dragend', 'MouseEvent');
        //     componentFixture.detectChanges();
        //     expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);
        //     done();
        // });
        testing_1.it('Drag start event should not be activated if drag is not enabled', function (done) {
            container.dragEnabled = false;
            componentFixture.detectChanges();
            var dragElem = componentFixture.elementRef.nativeElement.querySelector('#dragId');
            testing_1.expect(dragdropService.dragData).not.toBeDefined();
            testing_1.expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);
            dnd_component_factory_1.triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dragdropService.dragData).not.toBeDefined();
            testing_1.expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);
            done();
        });
        testing_1.it('Drop events should add/remove the expected classes to the target element', function (done) {
            var dragElem = componentFixture.elementRef.nativeElement.querySelector('#dragId');
            var dropElem = componentFixture.elementRef.nativeElement.querySelector('#dropId');
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(false);
            testing_1.expect(dropElem.classList.contains(config.onDragOverClass)).toEqual(false);
            // The drop events should not work before a drag is started on an element with the correct drop-zone
            dnd_component_factory_1.triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(false);
            dnd_component_factory_1.triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(true);
            testing_1.expect(dropElem.classList.contains(config.onDragOverClass)).toEqual(false);
            dnd_component_factory_1.triggerEvent(dropElem, 'dragover', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(true);
            testing_1.expect(dropElem.classList.contains(config.onDragOverClass)).toEqual(true);
            dnd_component_factory_1.triggerEvent(dropElem, 'dragleave', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(false);
            testing_1.expect(dropElem.classList.contains(config.onDragOverClass)).toEqual(false);
            dnd_component_factory_1.triggerEvent(dropElem, 'dragover', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElem, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElem.classList.contains(config.onDragEnterClass)).toEqual(false);
            testing_1.expect(dropElem.classList.contains(config.onDragOverClass)).toEqual(false);
            done();
        });
        // it('Drop event should activate the onDropSuccess and onDragSuccess callbacks', (done:any) => {
        //     let dragElem:HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragId');
        //     let dropElem:HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dropId');
        //     let dragCount:number = 0, dropCount:number = 0;
        //     container.drag.subscribe(($event:any) => {
        //        dragCount++;
        //     }, (error:any) => {}, () => {
        //        // Here is a function called when stream is complete
        //        expect(dragCount).toBe(0);
        //     });
        //     container.drop.subscribe(($event:any) => {
        //        dropCount++;
        //     }, (error:any) => {}, () => {
        //        // Here is a function called when stream is complete
        //        expect(dropCount).toBe(0);
        //     });
        //     triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        //     triggerEvent(dragElem, 'dragend', 'MouseEvent');
        //     triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        //     triggerEvent(dropElem, 'drop', 'MouseEvent');
        //     componentFixture.detectChanges();
        //     done();
        // });
        testing_1.it('The onDropSuccess callback should receive the dragged data as paramenter', function (done) {
            var dragData = { id: 1, name: 'Hello' };
            container.dragData = dragData;
            componentFixture.detectChanges();
            var dragElem = componentFixture.elementRef.nativeElement.querySelector('#dragId');
            var dropElem = componentFixture.elementRef.nativeElement.querySelector('#dropId');
            container.drag.subscribe(function ($event) {
                testing_1.expect($event.dragData).toBe(dragData);
            });
            container.drop.subscribe(function ($event) {
                testing_1.expect($event.dragData).toBe(dragData);
            });
            dnd_component_factory_1.triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElem, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            done();
        });
    });
}
exports.main = main;
//# sourceMappingURL=dnd.with.draggable.data.spec.js.map