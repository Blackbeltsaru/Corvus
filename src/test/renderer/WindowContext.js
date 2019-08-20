let glContext;
let canvas;
let triangles = [
    [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5],
    [0.0, 0.6, 0.5, 0.6, 0.5, -0.4]
]

const _renderer = (vertices) => {

    //Bind to the array buffer to create a vertex buffer
    //This vertext buffer is used later for rendering the object
    let vertexBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(vertices), glContext.STATIC_DRAW);
    glContext.bindBuffer(glContext.ARRAY_BUFFER, null); //Unbind the array buffer

    //Lets build and compile both the vertex and fragment shaders
    let vertShaderCode = 
        'attribute vec2 coords;' +
        'void main(void) {' +
        ' gl_Position = vec4(coords, 0.0, 1.0);' + 
        '}';
    let vertShader = _compileShader(glContext.VERTEX_SHADER, vertShaderCode);

    let fragShaderCode = 
        'void main(void) {' +
        ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + 
        '}';
    let fragShader = _compileShader(glContext.FRAGMENT_SHADER, fragShaderCode);
    let shaderProgram = _programShader(vertShader, fragShader);

    //Each attribute on the vertex shader needs to be bound to a vertex buffer
    glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);
    let coords = glContext.getAttribLocation(shaderProgram, "coords");
    glContext.vertexAttribPointer(coords, 2, glContext.FLOAT, false, 0, 0);
    glContext.enableVertexAttribArray(coords);

    glContext.drawArrays(glContext.TRIANGLES, 0, 3);

}

const _compileShader = (sahderType, shaderCode) => {
    let shader = glContext.createShader(sahderType);
    glContext.shaderSource(shader, shaderCode);
    glContext.compileShader(shader);
    return shader;
}

const _programShader = (vertexShader, fragmentShader) => {
    let shaderProgram = glContext.createProgram();
    glContext.attachShader(shaderProgram, vertexShader);
    glContext.attachShader(shaderProgram, fragmentShader);
    glContext.linkProgram(shaderProgram);
    glContext.useProgram(shaderProgram);
    return shaderProgram;
}

const WindowAnimator = () => {    
    canvas = document.getElementById('canvas');
    glContext = canvas.getContext('webgl2');

    //only do stuff if I have an actual webGl context
    if(glContext === null) {
        alert("Unable to initialize WebGl. Your browser may not support this feature"); //TODO: this needs to be localized
        return;
    }

    glContext.clearColor(0.5, 0.5, 0.5, 0.9);
    glContext.enable(glContext.DEPTH_TEST);
    glContext.clear(glContext.COLOR_BUFFER_BIT);
    glContext.clear(glContext.DEPTH_BUFFER_BIT);
    glContext.viewport(0, 0, canvas.width, canvas.height);

    for(let object in triangles) {
        _renderer(triangles[object])
    }
}

export default WindowAnimator;