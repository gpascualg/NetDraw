define(function (require) {

    var $ = require('jquery');
    require('jcanvas');

    var Controller = function() {

        if ( Controller.prototype._instance ) {
            return Controller.prototype._instance;
        }
        
        Controller.prototype._instance = this;

        this._selection = null;
        this._drawingLine = null;

        this._mappings = {
            'from': {},
            'to': {}
        };

        this.getCanvas = function() {
            return $('#canvas');
        },

        this.getWrapper = function() {
            return $('#wrapper');
        },

        this.getSelection = function() {
            return this._selection;
        }

        this.setSelection = function(selection) {
            this._selection = selection;
        }

        this.clearSelection = function() {
            this._selection = null;
        }

        this.getDrawingLine = function() {
            return this._drawingLine;
        }

        this.setDrawingLine = function(drawingLine) {
            this._drawingLine = drawingLine;
        }

        this.clearDrawingLine = function() {
            this._drawingLine = null;
        }

        this.getMappings = function() {
            return this._mappings;
        }

        this.getMappingsFor = function(origin, layer) {
            return this._mappings[origin][layer.node.id];
        }

        this.removeMapping = function(origin, id, line) {
            var index = this._mappings[origin][id].indexOf(line);
            if (index >= 0) {
                this._mappings[origin][id].splice(index, 1);            
                return true;
            }

            return false;
        }

        this.removeBothMappings = function(line) {
            this.removeMapping('from', line.node.from.node.id, line);
            this.removeMapping('to', line.node.to.node.id, line);
        }

        this.removeLayerMappings = function(layer) {
            this._mappings['from'][layer.node.id] = [];
            this._mappings['to'][layer.node.id] = [];
        }

        this.createLayerMappings = function(layer) {
            this.removeLayerMappings(layer);
        }
    };

    return new Controller();
});