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

        radius = 22;
        stretch = 1.50;
        resolution = 64;

        // cube that cuts the spheres
        cube = new Cube(2*stretch*radius).toCSG()
        cube = cube.transformed(Transform.unity().translateZ(stretch*radius));

        // stretched sphere
        upperHalf = new Sphere(radius, resolution, resolution/2).toCSG().
                transformed(Transform.unity().scaleZ(stretch));
        
        // upper half
        upperHalf = upperHalf.intersect(cube);
        
        lowerHalf = new Sphere(radius, resolution, resolution/2).toCSG();
        lowerHalf = lowerHalf.difference(cube);
        
         // stretch lower half
        lowerHalf = lowerHalf.transformed(Transform.unity().scaleZ(stretch*0.72));
        
        egg = upperHalf.union(lowerHalf);
        
        return egg;
}


