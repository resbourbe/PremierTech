// This program was developped by Daniel Audet and uses the file "basic-objects-IFS.js"
// from http://math.hws.edu/eck/cs424/notes2013/19_GLSL.html
//
//  It has been adapted to be compatible with the "MV.js" library developped
//  for the book "Interactive Computer Graphics" by Edward Angel and Dave Shreiner.
//

"use strict";

var gl;   // The webgl context.

var CoordsLoc;       // Location of the coords attribute variable in the standard texture mappping shader program.
var NormalLoc;
var TexCoordLoc;

var ProjectionLoc;     // Location of the uniform variables in the standard texture mappping shader program.
var ModelviewLoc;
var NormalMatrixLoc;


var projection;   //--- projection matrix
var modelview;    // modelview matrix
var flattenedmodelview;    //--- flattened modelview matrix

var normalMatrix = mat3();  //--- create a 3X3 matrix that will affect normals

var rotator;   // A SimpleRotator object to enable rotation by mouse dragging.

var prog;  // shader program identifier

var lightPosition = vec4(20.0, 20.0, 100.0, 1.0);

var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(0.0, 0.1, 0.3, 1.0);
var materialDiffuse = vec4(0.48, 0.55, 0.69, 1.0);
var materialSpecular = vec4(0.48, 0.55, 0.69, 1.0);
var materialShininess = 100.0;

var ambientProduct, diffuseProduct, specularProduct;

//Structure de Donneees Arbre
var Arbre = [];
var nombreNoeuds = 5;
//Structure de base
var garageID = 0;
var passerelleID = 1;
var mainDock1ID = 2;
var mainDock2ID = 3;
var ChapeauID = 4;
var ListeVariation = [];

//Formes du Vaisseau
//Structure de Base
var garage, passerelle, mainDock1, mainDock2;
//Moteur
var MoteurBaseAvant, MoteurBaseArriere, Core, StructBase,PlaqueMoteur;
//Detail
var GunLaser, Lumiere, Fenetre, Chapeau;
var ContourGarage, ContourMoteur;
//Inspiration
var PlaqueDaffichage;
var FeuDeProjection1, FeuDeProjection2;

// Section Structure de donnees (Arbre)
function creationNoeud(render, enfant, variation) {
    var Noeud = { render: render, enfant: enfant,variation: variation,}

    return Noeud;
}

function initialisationArbre() {
    //Remplir Arbre
   for (var i = 0; i < nombreNoeuds; i++) {
        initialisationNoeud(i);
    }
}

function initialisationNoeud(Position) {
    if (Position == garageID) {
        ListeVariation = [0, 0, -5, 0.0, 1, 0, 0, 0.5, 0.5, 0.5];
        Arbre[Position] = creationNoeud(renderGarage, passerelleID, ListeVariation);
    }
    if (Position == passerelleID) {
        ListeVariation = [0, 0, 4, 0.0, 1, 0, 0, 0.5, 0.5, 0.5];
        Arbre[Position] = creationNoeud(renderPasserelle, mainDock1ID, ListeVariation);
    }
    if (Position == mainDock1ID) {
        ListeVariation = [0, 0, 9.75, 0.0, 1, 0, 0, 1, 0.375, 0.5];
        Arbre[Position] = creationNoeud(renderMainDock1, mainDock2ID, ListeVariation);
    }
    if (Position == mainDock2ID) {
        ListeVariation = [0, 0, 12.5, 90.0, 1, 0, 0, 0.5, 0.5, 0.5];
        Arbre[Position] = creationNoeud(renderMainDock2, ChapeauID, ListeVariation);
    }
    if (Position == ChapeauID) {
        ListeVariation = [0, 3.16, 10, 90.0, 1, 0, 0, 0.5, 0.5, 0.5]
        Arbre[Position] = creationNoeud(renderChapeau, null, ListeVariation);
    }
}

function renderGarage(initialmodelview) {
    var Noeud = Arbre[garageID];
    modelview = initialmodelview;
    modelview = mult(modelview, translate(Noeud.variation[0], Noeud.variation[1], Noeud.variation[2]));
    modelview = mult(modelview, rotate(Noeud.variation[3], Noeud.variation[4], Noeud.variation[5], Noeud.variation[6]));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(Noeud.variation[7], Noeud.variation[8], Noeud.variation[9]));
    garage.render();
}
function renderPasserelle(initialmodelview) {
    var Noeud = Arbre[passerelleID];
    modelview = initialmodelview;
    modelview = mult(modelview, translate(Noeud.variation[0], Noeud.variation[1], Noeud.variation[2]));
    modelview = mult(modelview, rotate(Noeud.variation[3], Noeud.variation[4], Noeud.variation[5], Noeud.variation[6]));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(Noeud.variation[7], Noeud.variation[8], Noeud.variation[9]));
    passerelle.render();
}
function renderMainDock1(initialmodelview) {
    var Noeud = Arbre[mainDock1ID];
    modelview = initialmodelview;
    modelview = mult(modelview, translate(Noeud.variation[0], Noeud.variation[1], Noeud.variation[2]));
    modelview = mult(modelview, rotate(Noeud.variation[3], Noeud.variation[4], Noeud.variation[5], Noeud.variation[6]));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(Noeud.variation[7], Noeud.variation[8], Noeud.variation[9]));
    mainDock1.render();
}
function renderMainDock2(initialmodelview) {
    var Noeud = Arbre[mainDock2ID];
    modelview = initialmodelview;
    modelview = mult(modelview, translate(Noeud.variation[0], Noeud.variation[1], Noeud.variation[2]));
    modelview = mult(modelview, rotate(Noeud.variation[3], Noeud.variation[4], Noeud.variation[5], Noeud.variation[6]));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(Noeud.variation[7], Noeud.variation[8], Noeud.variation[9]));
    mainDock2.render();
}
function renderChapeau(initialmodelview) {
    var Noeud = Arbre[ChapeauID];
    modelview = initialmodelview;
    modelview = mult(modelview, translate(Noeud.variation[0], Noeud.variation[1], Noeud.variation[2]));
    modelview = mult(modelview, rotate(Noeud.variation[3], Noeud.variation[4], Noeud.variation[5], Noeud.variation[6]));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(Noeud.variation[7], Noeud.variation[8], Noeud.variation[9]));
    Chapeau.render();
}

function ParcourirArbre(Position, initialmodelview) {
    if (Position == null) {
        return;
    }
    Arbre[Position].render(initialmodelview);
    if (Arbre[Position].enfant != null) {
        ParcourirArbre(Arbre[Position].enfant, initialmodelview);
    }
}
// Fin Section Structure de donnees (Arbre)

// Section Tetrahede

var vertices = [
    vec4(0, 0, 1, 1.0),
    vec4(1, 0, 0, 1.0),
    vec4(0, 1, 0, 1.0),
    vec4(0, 0, 0, 1.0)
];
var numVertices = 4;
var pointsArray = [];
var normalsArray = [];
var nBuffer, vBuffer;

function triangle(a, b, c) {

    var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[a]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
    normal = normalize(normal);

    normalsArray.push(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);

    pointsArray.push(vertices[a]);
    pointsArray.push(vertices[b]);
    pointsArray.push(vertices[c]);
}

function tetra(a, b, c, d) {

    triangle(a, b, c);
    triangle(d, a, c);
    triangle(b, d, c);
    triangle(b, a, d);
}

// Fin Section Tetrahede

function render() {
    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //--- Get the rotation matrix obtained by the displacement of the mouse
    //---  (note: the matrix obtained is already "flattened" by the function getViewMatrix)
    flattenedmodelview = rotator.getViewMatrix();
    modelview = unflatten(flattenedmodelview);

	normalMatrix = extractNormalMatrix(modelview);
		
    var initialmodelview = modelview;

    // Couleur Gris
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(0.66, 0.71, 0.70, 1.0);
    materialSpecular = vec4(0.66, 0.71, 0.70, 1.0);
    CalculFragment();

    //Objet Opaque
    gl.disable(gl.BLEND);
    gl.depthMask(true);

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(CoordsLoc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.vertexAttribPointer(NormalLoc, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    //Structure de base (Arbre)
    ParcourirArbre(garageID, initialmodelview);

    //Moteur (5 Formes)

    CalculVertex(initialmodelview, 0,11, -5, 0, 1, 0, 0, 0.5, 0.5, 0.5);
    MoteurBaseAvant.render();

    CalculVertex(initialmodelview, 0, 11, -13, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    MoteurBaseArriere.render();

    CalculVertex(initialmodelview, 0, 11, -15, 0.0, 1, 0, 0, 0.3, 0.3, 0.3);
    MoteurBaseArriere.render();

    CalculVertex(initialmodelview, 0, 11, -9, 90.0, 1, 0.0, 90.0, 0.5, 0.5, 0.5);
    PlaqueMoteur.render();

    CalculVertex(initialmodelview, 0, 11, -9, 0.0, 1, 0.0, 0.0, 0.5, 0.5, 0.5);
    PlaqueMoteur.render();

    //Pied du Moteur (3 Formes)
    CalculVertex(initialmodelview, 0, 5.5, -6, 0.0, 1, 0, 0, 0.2, 0.2, 0.5);
    StructBase.render();
    CalculVertex(initialmodelview, 0, 7.5, -7.5, 0.0, 1, 0, 0, 0.2, 0.3, 0.2);
    StructBase.render();
    CalculVertex(initialmodelview, 0, 9.2, -8.5, 0.0, 1, 0, 0, 0.2, 0.1, 0.9);
    StructBase.render();

    // Couleur Bleu (4 Formes)
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(0.0, 0.0, 2.55, 1.0);
    materialSpecular = vec4(0.0, 0.0, 2.55, 1.0);
    CalculFragment();

    CalculVertex(initialmodelview, 1.3, 12, -10, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    Core.render();

    CalculVertex(initialmodelview, -1.3, 12, -10, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    Core.render();
  
    CalculVertex(initialmodelview, -1.3, 10, -10, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    Core.render();

    CalculVertex(initialmodelview, 1.3, 10, -10, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    Core.render();

    // Couleur Rouse/Rose
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(2.55, 0.71, 0.70, 1.0);
    materialSpecular = vec4(2.55, 0.71, 0.70, 1.0);
    CalculFragment();

    //Gun
    CalculVertex(initialmodelview, 0, 3.16, 11.6, 0.0, 0, 1, 0, 0.1, 0.2, 0.2);
    Fenetre.render();
    CalculVertex(initialmodelview, 0, 3.4, 13, 0.0, 0, 1, 0, 0.1, 0.2, 0.2);
    GunLaser.render();
    CalculVertex(initialmodelview, 0, 2.8, 13, 0.0, 0, 1, 0, 0.1, 0.2, 0.5);
    GunLaser.render();

    //Lumiere
    //Couleur Rouge
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(2.55, 0, 0, 1.0);
    materialSpecular = vec4(2.55, 0, 0, 1.0);
    CalculFragment();

    CalculVertex(initialmodelview, 0, 5, -1.5, 0.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Lumiere.render();
    CalculVertex(initialmodelview, 0, 4.5, 10, 0.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Lumiere.render();
    CalculVertex(initialmodelview, 0, 1.9, 16, 0.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Lumiere.render();
    CalculVertex(initialmodelview, 5, 0, -9, 0.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Lumiere.render();
    CalculVertex(initialmodelview, -5, 0, -9, 0.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Lumiere.render();

    // Couleur Jaume
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(2.55, 2.55, 0.0, 1.0);
    materialSpecular = vec4(2.55, 2.55, 0.0, 1.0);
    CalculFragment();

    CalculVertex(initialmodelview, 0, 0, -0.04, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    ContourGarage.render();
    CalculVertex(initialmodelview, 0, 0, -9.99, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    ContourGarage.render();

    CalculVertex(initialmodelview, 0, 11, -4.1, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    ContourMoteur.render();

    CalculVertex(initialmodelview, 0, 11, -13.98, 0.0, 1, 0, 0, 0.5, 0.5, 0.5);
    ContourMoteur.render();

    //Couleur Bleu Poudre
    materialAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    materialDiffuse = vec4(0.96, 2.07, 2.55, 1.0);
    materialSpecular = vec4(0.96, 2.07, 2.55, 1.0);
    CalculFragment();

    //Objet Translucide
    gl.enable(gl.BLEND);
    gl.depthMask(false);

    //Main Fenetre Droit Vers la gauche (5 Formes)
    CalculVertex(initialmodelview, 3.2, 0.0, 15, 50.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Fenetre.render();
    CalculVertex(initialmodelview, 1.6, 0.0, 16.3, 25.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Fenetre.render();
    CalculVertex(initialmodelview, 0, 0.0, 16.7, 0.0, 0, 1, 0, 0.15, 0.2, 0.2);
    Fenetre.render();
    CalculVertex(initialmodelview, -3.2, 0.0, 15, -50.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Fenetre.render();
    CalculVertex(initialmodelview, -1.6, 0.0, 16.3, -25.0, 0, 1, 0, 0.2, 0.2, 0.2);
    Fenetre.render();

    //Chapeau Fenetre Droit vers la Gauche (2 Formes)
    CalculVertex(initialmodelview, 1.1, 3.16, 11.8, 30.0, 0, 1, 0, 0.15, 0.2, 0.1);
    Fenetre.render();
    CalculVertex(initialmodelview, -1.1, 3.16, 11.8, -30.0, 0, 1, 0, 0.15, 0.2, 0.1);
    Fenetre.render();
   
	}

function CalculFragment() {
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(prog, "shininess"), materialShininess);

    gl.uniform4fv(gl.getUniformLocation(prog, "lightPosition"), flatten(lightPosition));
    //gl.depthMask(false);
}
function CalculVertex(initialmodelview, t1, t2, t3, r1, r2, r3, r4, s1, s2, s3) {
    modelview = initialmodelview;
    modelview = mult(modelview, translate(t1, t2, t3));
    modelview = mult(modelview, rotate(r1, r2, r3, r4));
    normalMatrix = extractNormalMatrix(modelview);  // always extract the normal matrix before scaling
    modelview = mult(modelview, scale(s1, s2, s3));
}

function unflatten(matrix) {
    var result = mat4();
    result[0][0] = matrix[0]; result[1][0] = matrix[1]; result[2][0] = matrix[2]; result[3][0] = matrix[3];
    result[0][1] = matrix[4]; result[1][1] = matrix[5]; result[2][1] = matrix[6]; result[3][1] = matrix[7];
    result[0][2] = matrix[8]; result[1][2] = matrix[9]; result[2][2] = matrix[10]; result[3][2] = matrix[11];
    result[0][3] = matrix[12]; result[1][3] = matrix[13]; result[2][3] = matrix[14]; result[3][3] = matrix[15];

    return result;
}

function extractNormalMatrix(matrix) { // This function computes the transpose of the inverse of 
    // the upperleft part (3X3) of the modelview matrix (see http://www.lighthouse3d.com/tutorials/glsl-tutorial/the-normal-matrix/ )

    var result = mat3();
    var upperleft = mat3();
    var tmp = mat3();

    upperleft[0][0] = matrix[0][0];  // if no scaling is performed, one can simply use the upper left
    upperleft[1][0] = matrix[1][0];  // part (3X3) of the modelview matrix
    upperleft[2][0] = matrix[2][0];

    upperleft[0][1] = matrix[0][1];
    upperleft[1][1] = matrix[1][1];
    upperleft[2][1] = matrix[2][1];

    upperleft[0][2] = matrix[0][2];
    upperleft[1][2] = matrix[1][2];
    upperleft[2][2] = matrix[2][2];

    tmp = matrixinvert(upperleft);
    result = transpose(tmp);

    return result;
}

function matrixinvert(matrix) {

    var result = mat3();

    var det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
                 matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                 matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

    var invdet = 1 / det;

    // inverse of matrix m
    result[0][0] = (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) * invdet;
    result[0][1] = (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) * invdet;
    result[0][2] = (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) * invdet;
    result[1][0] = (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) * invdet;
    result[1][1] = (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) * invdet;
    result[1][2] = (matrix[1][0] * matrix[0][2] - matrix[0][0] * matrix[1][2]) * invdet;
    result[2][0] = (matrix[1][0] * matrix[2][1] - matrix[2][0] * matrix[1][1]) * invdet;
    result[2][1] = (matrix[2][0] * matrix[0][1] - matrix[0][0] * matrix[2][1]) * invdet;
    result[2][2] = (matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]) * invdet;

    return result;
}

// The following function is used to create an "object" (called "model") containing all the informations needed
// to draw a particular element (sphere, cylinder, cube,...). 
// Note that the function "model.render" is defined inside "createModel" but it is NOT executed.
// That function is only executed when we call it explicitly in render().

function createModel(modelData) {

	// the next line defines an "object" in Javascript
	// (note that there are several ways to define an "object" in Javascript)
	var model = {};
	
	// the following lines defines "members" of the "object"
    model.coordsBuffer = gl.createBuffer();
    model.normalBuffer = gl.createBuffer();
    model.textureBuffer = gl.createBuffer();
    model.indexBuffer = gl.createBuffer();
    model.count = modelData.indices.length;

	// the "members" are then used to load data from "modelData" in the graphic card
    gl.bindBuffer(gl.ARRAY_BUFFER, model.coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexTextureCoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);

	// The following function is NOT executed here. It is only DEFINED to be used later when we
	// call the ".render()" method.
    model.render = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
        gl.vertexAttribPointer(CoordsLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(NormalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.vertexAttribPointer(TexCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        gl.uniformMatrix4fv(ModelviewLoc, false, flatten(modelview));    //--- load flattened modelview matrix
        gl.uniformMatrix3fv(NormalMatrixLoc, false, flatten(normalMatrix));  //--- load flattened normal matrix

        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
        console.log(this.count);
    }
	
	// we now return the "object".
    return model;
}



function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, vertexShaderSource);
    gl.compileShader(vsh);
    if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
    }
    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
        throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}


function getTextContent(elementID) {
    var element = document.getElementById(elementID);
    var fsource = "";
    var node = element.firstChild;
    var str = "";
    while (node) {
        if (node.nodeType == 3) // this is a text node
            str += node.textContent;
        node = node.nextSibling;
    }
    return str;
}


window.onload = function init() {
    try {
        var canvas = document.getElementById("glcanvas");
        gl = canvas.getContext("webgl");
        if (!gl) {
            gl = canvas.getContext("experimental-webgl");
        }
        if (!gl) {
            throw "Could not create WebGL context.";
        }

        // LOAD SHADER (standard texture mapping)
        var vertexShaderSource = getTextContent("vshader");
        var fragmentShaderSource = getTextContent("fshader");
        prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);

        gl.useProgram(prog);

        // locate variables for further use
        CoordsLoc = gl.getAttribLocation(prog, "vcoords");
        NormalLoc = gl.getAttribLocation(prog, "vnormal");
        TexCoordLoc = gl.getAttribLocation(prog, "vtexcoord");

        ModelviewLoc = gl.getUniformLocation(prog, "modelview");
        ProjectionLoc = gl.getUniformLocation(prog, "projection");
        NormalMatrixLoc = gl.getUniformLocation(prog, "normalMatrix");

        gl.enableVertexAttribArray(CoordsLoc);
        gl.enableVertexAttribArray(NormalLoc);
		gl.disableVertexAttribArray(TexCoordLoc);  // we do not need texture coordinates

        gl.enable(gl.DEPTH_TEST);
        
        //Tetra
        tetra(0, 1, 2, 3);
        nBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

        vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

        //  create a "rotator" monitoring mouse mouvement
        rotator = new SimpleRotator(canvas, render);
        //  set initial camera position at z=40, with an "up" vector aligned with y axis
        //   (this defines the initial value of the modelview matrix )
        rotator.setView([0, 0, 1], [0, 1, 0], 40);

		projection = perspective(70.0, 1.0, 1.0, 200.0);
		gl.uniformMatrix4fv(ProjectionLoc, false, flatten(projection));  // send projection matrix to the shader program
		
		// In the following lines, we create different "elements" (sphere, cylinder, box, disk,...).
		// These elements are "objects" returned by the "createModel()" function.
		// The "createModel()" function requires one parameter which contains all the information needed
		// to create the "object". The functions "uvSphere()", "uvCylinder()", "cube()",... are described
		// in the file "basic-objects-IFS.js". They return an "object" containing vertices, normals, 
		// texture coordinates and indices.
		// 

        //Structure de Base
        garage = createModel(uvCylinder(10.0, 21.0, 35.0, false, false));
        ContourGarage = createModel(uvCylinder(10.3, 1, 35.0, false, false));
        passerelle = createModel(uvCylinder(3.5, 15.0, 35.0, false, false));
        mainDock1 = createModel(cube(10.0));
        mainDock2 = createModel(uvCylinder(10.0, 7.4, 35.0, false, false));
        Chapeau = createModel(uvCylinder(5.0, 5, 35.0, false, false));

        //Moteur
        MoteurBaseAvant = createModel(uvCylinder(5.0, 5, 35.0, false, false));
        MoteurBaseArriere = createModel(uvCylinder(5.0, 5, 35.0, false, false));
        ContourMoteur = createModel(uvCylinder(5.3, 1, 35, false, false));
        PlaqueMoteur = createModel(uvCylinder(5.0, 12, 2.0, false, false));
        Core = createModel(uvCylinder(1.5, 15, 35.0, false, false));
        StructBase = createModel(cube(10.0));

        //Detail
        Fenetre = createModel(cube(10.0));
        GunLaser = createModel(uvCylinder(1.2, 5, 15.0, false, false));
        Lumiere = createModel(uvSphere(2.5, 20, 25.0));

		// managing arrow keys (to move up or down the model)
		document.onkeydown = function (e) {
			switch (e.key) {
				case 'Home':
					// resize the canvas to the current window width and height
					resize(canvas);
					break;
			}
		};

    }
    catch (e) {
        document.getElementById("message").innerHTML =
             "Could not initialize WebGL: " + e;
        return;
    }

	resize(canvas);  // size the canvas to the current window width and height


    initialisationArbre();
    render();
}

function resize(canvas) {  // ref. https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
  var realToCSSPixels = window.devicePixelRatio;

  var actualPanelWidth = Math.floor(0.85 * window.innerWidth * realToCSSPixels); // because, in the HTML file, we have set the right panel to be 85% of the window width
  var actualPanelHeight = Math.floor(0.96 * window.innerHeight * realToCSSPixels); 

  var minDimension = Math.min(actualPanelWidth, actualPanelHeight);
    
   // Ajust the canvas to this dimension (square)
    canvas.width  = minDimension;
    canvas.height = minDimension;
	
	gl.viewport(0, 0, canvas.width, canvas.height);

}