class LayerStack {

    //Class variables
    // _Layers;
    // _LayerInsert;

    constructor() {
        this._Layers = [];
        this._LayerInsert = 0;
    }

    pushLayer(layer) {
        this._Layers.splice(this._LayerInsert, 0, layer);
        this._LayerInsert++;
    }
    pushOverlay(layer) {
        this._Layers.push(layer);
    }
    popLayer(layer) {
        //TODO: is filter the fastest way to do this?
        this._Layers = this._Layers.filter(l => l !== layer);
        this._LayerInsert--;
    }
    popOverlay(layer) {
        //TODO: is filter the fastest way to do this?
        this._Layers = this._Layers.filter(l => l !== layer);
    }

    //TODO: in other languages these methods can be used to get
    //iterator pointers for the layers and then iterat from there
    begin() {return 0;}
    end() {return this._Layers.length;}
    get(i) {return this._Layers[i];}

}

export default LayerStack;