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
            return tcb.createAsync(dnd_component_factory_1.Container).then(function (cf) {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = componentFixture.componentInstance;
            });
        })));
        testing_1.it('should be defined', function () {
            testing_1.expect(componentFixture).toBeDefined();
        });
        testing_1.it('Drop events should not be activated on the wrong drop-zone', function (done) {
            var dragElemOne = componentFixture.elementRef.nativeElement.querySelector('#dragIdOne');
            var dropElemTwo = componentFixture.elementRef.nativeElement.querySelector('#dropIdTwo');
            dnd_component_factory_1.triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElemTwo, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemTwo.classList.contains(config.onDragEnterClass)).toEqual(false);
            dnd_component_factory_1.triggerEvent(dropElemTwo, 'dragover', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemTwo.classList.contains(config.onDragOverClass)).toEqual(false);
            var dragCount = 0, dropCount = 0;
            container.dragOne.subscribe(function ($event) {
                dragCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dragCount).toBe(0);
            });
            container.dropTwo.subscribe(function ($event) {
                dropCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dropCount).toBe(0);
            });
            dnd_component_factory_1.triggerEvent(dropElemTwo, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            done();
        });
        testing_1.it('Drop events should be activated on the same drop-zone', function (done) {
            var dragElemOne = componentFixture.elementRef.nativeElement.querySelector('#dragIdOne');
            var dropElemOne = componentFixture.elementRef.nativeElement.querySelector('#dropIdOne');
            dnd_component_factory_1.triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElemOne, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemOne.classList.contains(config.onDragEnterClass)).toEqual(true);
            dnd_component_factory_1.triggerEvent(dropElemOne, 'dragover', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemOne.classList.contains(config.onDragOverClass)).toEqual(true);
            var dragCount = 0, dropCount = 0;
            container.dragOne.subscribe(function ($event) {
                dragCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dragCount).toBe(1);
            });
            container.dropOne.subscribe(function ($event) {
                dropCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dropCount).toBe(1);
            });
            dnd_component_factory_1.triggerEvent(dropElemOne, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            done();
        });
        testing_1.it('Drop events on multiple drop-zone', function (done) {
            var dragElemOneTwo = componentFixture.elementRef.nativeElement.querySelector('#dragIdOneTwo');
            var dropElemOneTwo = componentFixture.elementRef.nativeElement.querySelector('#dropIdOneTwo');
            dnd_component_factory_1.triggerEvent(dragElemOneTwo, 'dragstart', 'MouseEvent');
            dnd_component_factory_1.triggerEvent(dropElemOneTwo, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemOneTwo.classList.contains(config.onDragEnterClass)).toEqual(true);
            dnd_component_factory_1.triggerEvent(dropElemOneTwo, 'dragover', 'MouseEvent');
            componentFixture.detectChanges();
            testing_1.expect(dropElemOneTwo.classList.contains(config.onDragOverClass)).toEqual(true);
            var dragCount = 0, dropCount = 0;
            container.dragOne.subscribe(function ($event) {
                dragCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dragCount).toBe(1);
            });
            container.dropOne.subscribe(function ($event) {
                dropCount++;
            }, function (error) { }, function () {
                // Here is a function called when stream is complete
                testing_1.expect(dropCount).toBe(1);
            });
            dnd_component_factory_1.triggerEvent(dropElemOneTwo, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            done();
        });
    });
}
exports.main = main;
//# sourceMappingURL=dnd.without.draggable.data.spec.js.map