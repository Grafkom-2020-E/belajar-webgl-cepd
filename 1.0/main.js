function main() {
    var canvas = document.getElementById("myCanvas")
    //canvar adalah pointer yang mengarah ke canvas
    var gl = canvas.getContext("webgl");
    //gl ini kayak alat tulis, canvas kertasnya

    // cara lain, jadi code untuk 2 dibawah ini ditaroh di html
    // var vertexShaderSource = document.getElementById("vertexShaderSource").text
    // var vertexShaderSource = document.getElementById("fragmentShaderSource").text

    //PERTEMUAN 3
    //MEMBUAT 3 TITIK
    /* Definisi data vertex
    * TITIK A (-0.5,-0.5)
    * TITIK B (0.5, -0.5)
    * TITIK C (0.5, 0.5)
    */

    var vertices = [
        -0.5,-0.5,          //titik A
        0.5, -0.5,          //titik B
       -0.5, 0.5,           //titik C
       0.5, 0.5             //titik D
    ];


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //menyimpan alamat
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW) //masukkan datanya
    //bilang kepada GPU biar ngelepas buffernya
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderSource = `
    attribute vec2 a_Position;
    void main(){
        gl_PointSize = 25.0;
        gl_Position = vec4(a_Position, 0.0, 1.0);
        
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

    /* 
    * Ajarkan attribute a_position di GPU 
    * tentang pengambilan data vertex dari ARRAY_BUFFER
    * awali dengan membuat pointer
    */
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
   var aPositionLoc = gl.getAttribLocation(shaderProgram, "a_Position");
   gl.vertexAttribPointer(aPositionLoc, 2 , gl.FLOAT, false, 0, 0);
   //size -> berapa size yang ingin ditarik
   // type -> tipe data, float (by default vec2 ada 2 float)
   // normalize -> false; kapan pake true? ketika ga pake 0 sampe 1
   // stride -> isi nol dulu ntar dijelasin
   // offset -> -"-
    gl.enableVertexAttribArray(aPositionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //mulai mewarnaiiii
    gl.clearColor(0.0, 0.0, 0.0, 1.0); //RGBA
    gl.clear(gl.COLOR_BUFFER_BIT);



  var primitive = gl.TRIANGLE_STRIP;
  var offset = 0;
  var nVertex = 4;
  gl.drawArrays(primitive, offset, nVertex);
}
