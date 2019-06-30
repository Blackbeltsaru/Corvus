

class LayerStack {

    m_Layers;
    m_LayerInsert;

    constructor() {
        this.m_Layers = [];
        this.m_LayerInsert = 0;
    }

    pushLayer(layer) {
        this.m_Layers.splice(this.m_LayerInsert, 0, layer);
        this.m_LayerInsert++;
    }
    pushOverlay(layer) {
        this.m_Layers.push(layer);
    }
    popLayer(layer) {
        //TODO: is filter the fastest way to do this?
        this.m_Layers = this.m_Layers.filter(l => l !== layer);
        this.m_LayerInsert--;
    }
    popOverlay(layer) {
        //TODO: is filter the fastest way to do this?
        this.m_Layers = this.m_Layers.filter(l => l !== layer);
    }

    //TODO: in other languages these methods can be used to get
    //iterator pointers for the layers and then iterat from there
    begin() {return 0;}
    end() {return this.m_Layers.length;}
    get(i) {return this.m_Layers[i];}

}

export default LayerStack;