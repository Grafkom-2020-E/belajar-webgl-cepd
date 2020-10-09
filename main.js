function main() {
    var canvas = document.getElementById("myCanvas")
    //canvar adalah pointer yang mengarah ke canvas
    var gl = canvas.getContext("webgl");
    //gl ini kayak alat tulis, canvas kertasnya

    var vertexShaderSource = `
    void main(){
        gl_PointSize = 80.0;
        gl_Position = vec4(0.0, 0.2, 0.0, 1.0);
        
    }
    `;
    //gl position ini poin nya (x,y,z,w) meskipun di 2 dimensi, z masih ttp ditulis meskipun 0. 

    var fragmentShaderSource = `
    void main(){
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }`;

    //buat objek shader , buat .c di GPU

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    //ini buat apa ya???
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    //Compile .c ke .o
    gl.compileShader(vertexShader);

    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS))
    {
        console.error('ERROR COMPILING vertex shadder!', gl.getShaderInfoLog(vertexShader));
    }


    gl.compileShader(fragmentShader);

    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS))
    {
        console.error('ERROR COMPILING fragment shadder!', gl.getShaderInfoLog(fragmentShader));
    }
   
    // Siapkan wadah untuk .exe (shader program)
    var shaderProgram = gl.createProgram();

    //masukkan .o ke dalam wadah .exe
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    //sambungkan antar .o agar bisa menjadi 
    //runnable context di dalam wadah .exe tadi
    gl.linkProgram(shaderProgram);

    //mulai menggunakan konteks 
    gl.useProgram(shaderProgram);

    //mulai mewarnaiiii
    gl.clearColor(0.0, 0.0, 0.0, 1.0); //RGBA
    gl.clear(gl.COLOR_BUFFER_BIT);


    //buat apa ini ketinggalan T-T
    gl.drawArrays(gl.POINTS, 0, 1);
}