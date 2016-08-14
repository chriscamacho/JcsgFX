

CSG = Java.type("eu.mihosoft.vrl.v3d.CSG")
Cube = Java.type("eu.mihosoft.vrl.v3d.Cube")
Sphere = Java.type("eu.mihosoft.vrl.v3d.Sphere")
Transform =  Java.type("eu.mihosoft.vrl.v3d.Transform")

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


