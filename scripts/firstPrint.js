CSG = Java.type("eu.mihosoft.jcsg.CSG")
Extrude = Java.type("eu.mihosoft.jcsg.Extrude")

Vector3d = Java.type("eu.mihosoft.vvecmath.Vector3d")
Transform = Java.type("eu.mihosoft.vvecmath.Transform")
Matrix3d = Java.type("eu.mihosoft.jcsg.Matrix3d")

Vertex = Java.type("eu.mihosoft.jcsg.Vertex")
Polygon = Java.type("eu.mihosoft.jcsg.Polygon")

Sphere = Java.type("eu.mihosoft.jcsg.Sphere")
Cube = Java.type("eu.mihosoft.jcsg.Cube")
Cylinder = Java.type("eu.mihosoft.jcsg.Cylinder")
RoundedCube = Java.type("eu.mihosoft.jcsg.RoundedCube")

function main() {
	rc = new RoundedCube 
	return rc.toCSG()
}
